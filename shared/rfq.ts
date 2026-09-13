import { z } from 'zod';
import { categories } from './catalog';

export const categoryIds = categories.map((c) => c.id) as [string, ...string[]];

export const contactMethods = ['email', 'phone', 'whatsapp'] as const;

/** What the buyer is sharing to describe the requirement. Custom Sourcing pre-selects this. */
export const sourcingBases = ['code', 'drawing', 'photo', 'sample'] as const;
export type SourcingBasis = (typeof sourcingBases)[number];
export const SOURCING_LABELS: Record<SourcingBasis, string> = {
  code: 'A product code',
  drawing: 'A technical drawing',
  photo: 'A photograph',
  sample: 'A physical sample',
};

/**
 * Enquiry schema shared by the browser form and the Express route, so the
 * client and server can never disagree about what a valid enquiry looks like.
 */
export const rfqSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  company: z.string().trim().min(2, 'Please enter your company name'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a contact number')
    .max(24, 'That number looks too long'),
  preferredContact: z.enum(contactMethods).default('email'),
  city: z.string().trim().max(120).optional().or(z.literal('')),

  productCategory: z.enum(categoryIds, {
    errorMap: () => ({ message: 'Please choose a product category' }),
  }),
  productCode: z.string().trim().max(120).optional().or(z.literal('')),
  gradeOrCoating: z.string().trim().max(120).optional().or(z.literal('')),
  workpieceMaterial: z.string().trim().max(160).optional().or(z.literal('')),
  quantity: z.string().trim().max(80).optional().or(z.literal('')),
  /** Codes collected in the browser's enquiry list, sent alongside the message. */
  enquiryList: z.string().trim().max(2000).optional().or(z.literal('')),
  sourcingBasis: z.enum(sourcingBases).optional().or(z.literal('')),
  /** Browsers send checkbox state as a boolean; multipart submissions send it as text. */
  consent: z.preprocess(
    (v) => v === true || v === 'true' || v === 'on',
    z.boolean().refine((v) => v, { message: 'Please confirm we may use these details to reply to you' }),
  ),

  requirement: z
    .string()
    .trim()
    .min(10, 'Please describe what you need in a little more detail')
    .max(4000, 'Please keep this under 4000 characters'),
});

export type RfqInput = z.infer<typeof rfqSchema>;

export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const ACCEPTED_UPLOAD_MIME = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

export const ACCEPTED_UPLOAD_EXT = ['.pdf', '.jpg', '.jpeg', '.png', '.xls', '.xlsx', '.dwg', '.dxf', '.step', '.stp'];

export const UPLOAD_HINT = 'PDF, image, spreadsheet or CAD drawing — up to 10 MB';
