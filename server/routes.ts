import type { Express, Request } from 'express';
import { createServer, type Server } from 'http';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import { logger } from './lib/logger';
import { limitOrThrow, RateLimitError } from './lib/ratelimit';
import {
  rfqSchema,
  MAX_UPLOAD_BYTES,
  ACCEPTED_UPLOAD_MIME,
  ACCEPTED_UPLOAD_EXT,
  SOURCING_LABELS,
  type RfqInput,
} from '../shared/rfq';
import { categoryById } from '../shared/catalog';

const UPLOAD_DIR = 'uploads';
const ENQUIRY_LOG_DIR = path.join('uploads', 'enquiries');

const upload = multer({
  dest: UPLOAD_DIR,
  limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const ok =
      ACCEPTED_UPLOAD_MIME.includes(file.mimetype) || ACCEPTED_UPLOAD_EXT.includes(ext);
    if (!ok) {
      cb(new Error('Unsupported file type'));
      return;
    }
    cb(null, true);
  },
});

const clientIp = (req: Request): string =>
  (req.ip || req.socket.remoteAddress || 'unknown').toString();

/** True only when every SMTP variable needed to actually deliver mail is set. */
function mailConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RFQ_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !RFQ_TO_EMAIL) return null;
  return {
    host: SMTP_HOST,
    port: Number.parseInt(SMTP_PORT, 10),
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: RFQ_TO_EMAIL,
  };
}

function formatEnquiry(data: RfqInput, ref: string, hasFile: string | null): string {
  const category = categoryById(data.productCategory as never)?.name ?? data.productCategory;
  const row = (label: string, value?: string) =>
    value && value.trim() ? `${label}: ${value.trim()}\n` : '';

  return (
    `New enquiry — reference ${ref}\n\n` +
    row('Name', data.name) +
    row('Company', data.company) +
    row('Email', data.email) +
    row('Phone / WhatsApp', data.phone) +
    row('City / location', data.city) +
    row('Preferred contact', data.preferredContact) +
    `\nRequirement\n` +
    row('Category', category) +
    row('Product code', data.productCode) +
    row('Grade / coating', data.gradeOrCoating) +
    row('Workpiece material', data.workpieceMaterial) +
    row('Quantity', data.quantity) +
    row('Enquiry list', data.enquiryList) +
    row('Sharing', data.sourcingBasis ? SOURCING_LABELS[data.sourcingBasis] : '') +
    row('Consent to reply', data.consent ? 'Given' : '') +
    `\n${data.requirement}\n\n` +
    (hasFile ? `Attachment: ${hasFile}\n` : 'No attachment provided\n') +
    `\nReceived: ${new Date().toISOString()}\n`
  );
}

/**
 * Persist every enquiry to disk before attempting delivery, so a mail failure
 * never means a lost enquiry. The folder is gitignored.
 */
function persistEnquiry(ref: string, data: RfqInput, attachment: string | null) {
  try {
    fs.mkdirSync(ENQUIRY_LOG_DIR, { recursive: true });
    fs.writeFileSync(
      path.join(ENQUIRY_LOG_DIR, `${ref}.json`),
      JSON.stringify({ ref, receivedAt: new Date().toISOString(), attachment, ...data }, null, 2),
    );
  } catch (error) {
    logger.error({ err: error, ref }, 'Could not persist enquiry to disk');
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, mailConfigured: mailConfig() !== null });
  });

  app.post('/api/rfq', (req, res, next) => {
    upload.single('attachment')(req, res, (err) => {
      if (!err) return next();
      const message =
        err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE'
          ? 'That file is larger than 10 MB. Please attach a smaller file.'
          : 'That file type is not supported. Please attach a PDF, image, spreadsheet or CAD drawing.';
      res.status(400).json({ ok: false, message });
    });
  }, async (req, res) => {
    const ref = `RFQ-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomUUID().slice(0, 6).toUpperCase()}`;
    const tempPath = req.file?.path;

    const cleanup = () => {
      if (tempPath && fs.existsSync(tempPath)) {
        try { fs.unlinkSync(tempPath); } catch { /* best effort */ }
      }
    };

    try {
      await limitOrThrow(clientIp(req), 'rfq');

      // Light spam protection that costs real visitors nothing: a hidden field
      // that bots tend to fill, and a minimum time between the form rendering
      // and being sent. Elapsed time is measured in the browser, so a skewed
      // client clock cannot reject a genuine buyer.
      if (typeof req.body.website === 'string' && req.body.website.trim() !== '') {
        cleanup();
        return res.status(400).json({ ok: false, message: 'We could not accept this submission. Please try again.' });
      }
      const elapsed = Number(req.body.formElapsedMs);
      if (Number.isFinite(elapsed) && elapsed >= 0 && elapsed < 2500) {
        cleanup();
        return res.status(400).json({ ok: false, message: 'That was very quick — please check your details and send again.' });
      }

      const data = rfqSchema.parse(req.body);
      const attachmentName = req.file?.originalname ?? null;
      persistEnquiry(ref, data, attachmentName);

      const mail = mailConfig();
      if (!mail) {
        // No credentials configured. The enquiry is saved, but we must not
        // tell the customer it was delivered when it was not.
        logger.warn({ ref }, 'Enquiry received but SMTP is not configured — saved to disk only');
        cleanup();
        return res.status(503).json({
          ok: false,
          reference: ref,
          message:
            'We could not send your enquiry just now. Your details are still in the form — please try again shortly.',
        });
      }

      const transporter = nodemailer.createTransport({
        host: mail.host,
        port: mail.port,
        secure: mail.port === 465,
        auth: { user: mail.user, pass: mail.pass },
      });

      await transporter.sendMail({
        from: `"ShreeRaj Tools — Website Enquiry" <${mail.user}>`,
        to: mail.to,
        replyTo: data.email,
        subject: `Enquiry from ${data.company} — ${data.productCode || categoryById(data.productCategory as never)?.name || 'General'} [${ref}]`,
        text: formatEnquiry(data, ref, attachmentName),
        attachments:
          tempPath && attachmentName
            ? [{ filename: attachmentName, content: fs.readFileSync(tempPath) }]
            : [],
      });

      logger.info({ ref }, 'Enquiry delivered');
      cleanup();
      return res.json({
        ok: true,
        reference: ref,
        message: 'Thank you — your enquiry has been sent. We will get back to you shortly.',
      });
    } catch (error) {
      cleanup();

      if (error instanceof RateLimitError) {
        res.setHeader('Retry-After', String(error.retryAfter));
        return res.status(429).json({ ok: false, message: error.message });
      }

      if (error instanceof z.ZodError) {
        return res.status(400).json({
          ok: false,
          message: 'Please check the highlighted fields and try again.',
          errors: error.errors.map((e) => ({ field: e.path.join('.'), message: e.message })),
        });
      }

      logger.error({ err: error, ref }, 'Enquiry submission failed');
      return res.status(502).json({
        ok: false,
        reference: ref,
        message:
          'We could not send your enquiry just now. Your details are still in the form — please try again shortly.',
      });
    }
  });

  return createServer(app);
}
