import nodemailer from 'nodemailer';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(config: EmailConfig) {
    this.transporter = nodemailer.createTransporter(config);
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      const info = await this.transporter.sendMail(options);
      console.log('Email sent successfully:', info.messageId);
    } catch (error) {
      console.error('Email sending failed:', error);
      throw new Error('Failed to send email');
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service verification failed:', error);
      return false;
    }
  }
}

export function createEmailService(): EmailService | null {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !port || !user || !pass) {
    console.warn('SMTP configuration incomplete, email service not available');
    return null;
  }

  const config: EmailConfig = {
    host,
    port: parseInt(port),
    secure: parseInt(port) === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
  };

  return new EmailService(config);
}

export async function sendRFQEmail(formData: {
  name: string;
  company: string;
  email: string;
  phone: string;
  component: string;
  annualVolume: string;
  material: string;
  message?: string;
}, attachment?: { filename: string; content: Buffer }) {
  const emailService = createEmailService();
  
  if (!emailService) {
    throw new Error('Email service not configured');
  }

  const emailContent = `
New RFQ Request from ${formData.name}

Company: ${formData.company}
Email: ${formData.email}
Phone: ${formData.phone}

Component/Part: ${formData.component}
Annual Volume: ${formData.annualVolume}
Material: ${formData.material}

Additional Message:
${formData.message || 'No additional message'}

---
This request was submitted through the Neo Automatics website.
Please respond to the customer within 24 hours.
  `;

  const emailOptions: EmailOptions = {
    from: process.env.SMTP_USER!,
    to: process.env.TO_EMAIL || 'neo.automatics@gmail.com',
    subject: `New RFQ Request from ${formData.company}`,
    text: emailContent,
    attachments: attachment ? [attachment] : undefined,
  };

  await emailService.sendEmail(emailOptions);
}

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const emailService = createEmailService();
  
  if (!emailService) {
    throw new Error('Email service not configured');
  }

  const emailContent = `
New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was submitted through the Neo Automatics contact form.
  `;

  const emailOptions: EmailOptions = {
    from: process.env.SMTP_USER!,
    to: process.env.TO_EMAIL || 'neo.automatics@gmail.com',
    subject: `Contact Form: ${formData.subject}`,
    text: emailContent,
  };

  await emailService.sendEmail(emailOptions);
}

export default {
  createEmailService,
  sendRFQEmail,
  sendContactEmail,
  EmailService,
};
