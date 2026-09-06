import { z } from 'zod';
import { categories } from './catalog';

export const categoryIds = categories.map((c) => c.id) as [string, ...string[]];

export const contactMethods = ['email', 'phone', 'whatsapp'] as const;

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

  productCategory: z.enum(categoryIds, {
    errorMap: () => ({ message: 'Please choose a product category' }),
  }),
  productCode: z.string().trim().max(120).optional().or(z.literal('')),
  gradeOrCoating: z.string().trim().max(120).optional().or(z.literal('')),
  workpieceMaterial: z.string().trim().max(160).optional().or(z.literal('')),
  quantity: z.string().trim().max(80).optional().or(z.literal('')),

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
