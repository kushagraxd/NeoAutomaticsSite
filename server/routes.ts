import type { Express } from "express";
import multer from "multer";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { z } from "zod";
import fs from "fs";
import path from "path";

// RFQ form validation schema
const rfqSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  component: z.string().min(2, "Component/Part description is required"),
  annualVolume: z.string().min(1, "Annual volume is required"),
  material: z.string().min(2, "Material specification is required"),
  message: z.string().optional(),
});

// Configure multer for RFQ form with strict security
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit to match frontend
  },
  fileFilter: (req, file, cb) => {
    // Strict file type validation - matches frontend validation
    const allowedTypes = [
      'application/pdf',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'image/jpeg',
      'image/png',
    ];
    
    const allowedExtensions = ['.dwg', '.dxf'];
    const hasAllowedExtension = allowedExtensions.some(ext => 
      file.originalname.toLowerCase().endsWith(ext)
    );
    
    if (allowedTypes.includes(file.mimetype) || hasAllowedExtension) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Only PDF, Excel, Images, DWG, and DXF files are allowed.`), false);
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // RFQ form submission endpoint with file upload support
  app.post('/api/rfq', upload.single('drawing'), async (req, res) => {
    try {
      console.log('RFQ submission received:', {
        body: req.body,
        file: req.file ? { 
          filename: req.file.filename, 
          originalName: req.file.originalname, 
          size: req.file.size, 
          mimetype: req.file.mimetype 
        } : null
      });

      // Validate data using Zod schema
      const validatedData = rfqSchema.parse({
        name: req.body.name,
        company: req.body.company,
        email: req.body.email,
        phone: req.body.phone,
        component: req.body.component,
        annualVolume: req.body.annualVolume,
        material: req.body.material,
        message: req.body.message || '',
      });

      // Handle file attachment
      let attachment = null;
      if (req.file) {
        const buffer = fs.readFileSync(req.file.path);
        attachment = {
          filename: req.file.originalname,
          content: buffer,
        };
        // Clean up temporary file
        fs.unlinkSync(req.file.path);
      }

      // Email configuration
      const toEmail = process.env.TO_EMAIL || 'quotes@neoautomatics.com';
      
      // Try Nodemailer first (if SMTP config is available)
      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      let emailSent = false;

      if (smtpHost && smtpPort && smtpUser && smtpPass) {
        try {
          console.log('Attempting to send email via Nodemailer...');
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: parseInt(smtpPort),
            secure: parseInt(smtpPort) === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          });

          const emailContent = `
New RFQ Request from ${validatedData.name}

Company: ${validatedData.company}
Email: ${validatedData.email}
Phone: ${validatedData.phone}

Component Details:
- Component/Part: ${validatedData.component}
- Annual Volume: ${validatedData.annualVolume}
- Material: ${validatedData.material}

${validatedData.message ? `Additional Message:\n${validatedData.message}` : ''}

${attachment ? `\nTechnical drawing attached: ${attachment.filename}` : 'No technical drawing provided'}

---
Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
`;

          const mailOptions = {
            from: `"Neo Automatics RFQ" <${smtpUser}>`,
            to: toEmail,
            replyTo: validatedData.email,
            subject: `New RFQ Request from ${validatedData.company} - ${validatedData.component}`,
            text: emailContent,
            attachments: attachment ? [attachment] : [],
          };

          await transporter.sendMail(mailOptions);
          console.log('Email sent successfully via Nodemailer');
          emailSent = true;

        } catch (nodemailerError) {
          console.error('Nodemailer failed:', nodemailerError);
        }
      }

      // Fallback to Formspree if Nodemailer failed or isn't configured
      if (!emailSent) {
        try {
          console.log('Attempting to send email via Formspree fallback...');
          const formspreeUrl = process.env.FORMSPREE_URL || 'https://formspree.io/f/YOUR_FORM_ID';
          
          const formData = new FormData();
          formData.append('name', validatedData.name);
          formData.append('company', validatedData.company);
          formData.append('email', validatedData.email);
          formData.append('phone', validatedData.phone);
          formData.append('component', validatedData.component);
          formData.append('annualVolume', validatedData.annualVolume);
          formData.append('material', validatedData.material);
          formData.append('message', validatedData.message || '');
          formData.append('submittedAt', new Date().toISOString());
          
          if (attachment) {
            formData.append('drawing', new Blob([attachment.content]), attachment.filename);
          }

          const response = await fetch(formspreeUrl, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            console.log('Email sent successfully via Formspree');
            emailSent = true;
          } else {
            console.error('Formspree failed:', await response.text());
          }

        } catch (formspreeError) {
          console.error('Formspree fallback failed:', formspreeError);
        }
      }

      // Return response based on email delivery success
      if (emailSent) {
        res.json({
          success: true,
          message: 'Quote request submitted successfully. We\'ll contact you within 24 hours.',
          data: {
            submittedAt: new Date().toISOString(),
            company: validatedData.company,
            component: validatedData.component,
            emailSent: true
          }
        });
      } else {
        console.error('All email delivery methods failed');
        return res.status(500).json({
          success: false,
          message: 'Failed to send quote request. Please try again or contact us directly at quotes@neoautomatics.com',
          data: {
            submittedAt: new Date().toISOString(),
            company: validatedData.company,
            component: validatedData.component,
            emailSent: false
          }
        });
      }

    } catch (error) {
      console.error('RFQ submission error:', error);
      
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.errors
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
