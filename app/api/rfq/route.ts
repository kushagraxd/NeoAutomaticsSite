import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const rfqSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  product: z.string().min(1),
  annualVolume: z.string().min(1),
  material: z.string().optional(),
  surfaceFinish: z.string().optional(),
  targetPrice: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const data = {
      name: formData.get('name') as string,
      company: formData.get('company') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      product: formData.get('product') as string,
      annualVolume: formData.get('annualVolume') as string,
      material: formData.get('material') as string || '',
      surfaceFinish: formData.get('surfaceFinish') as string || '',
      targetPrice: formData.get('targetPrice') as string || '',
      message: formData.get('message') as string || '',
    };

    // Validate data
    const validatedData = rfqSchema.parse(data);

    // Handle file attachment
    const drawingFile = formData.get('drawing') as File | null;
    let attachment = null;
    
    if (drawingFile && drawingFile.size > 0) {
      if (drawingFile.size > 10 * 1024 * 1024) {
        return NextResponse.json(
          { message: 'File size exceeds 10MB limit' },
          { status: 400 }
        );
      }
      
      const buffer = Buffer.from(await drawingFile.arrayBuffer());
      attachment = {
        filename: drawingFile.name,
        content: buffer,
      };
    }

    // Try Nodemailer first (if SMTP config is available)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const toEmail = process.env.TO_EMAIL || 'neo.automatics@gmail.com';

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      try {
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

Product: ${validatedData.product}
Annual Volume: ${validatedData.annualVolume}
Material: ${validatedData.material || 'Not specified'}
Surface Finish: ${validatedData.surfaceFinish || 'Not specified'}
Target Price: ${validatedData.targetPrice || 'Not specified'}

Additional Message:
${validatedData.message || 'No additional message'}

---
This request was submitted through the Neo Automatics website.
        `;

        const mailOptions = {
          from: smtpUser,
          to: toEmail,
          subject: `New RFQ Request from ${validatedData.company}`,
          text: emailContent,
          attachments: attachment ? [attachment] : [],
        };

        await transporter.sendMail(mailOptions);
        
        return NextResponse.json({ 
          message: 'Quote request submitted successfully via email' 
        });
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Fall through to Formspree
      }
    }

    // Fallback to Formspree
    const formspreeId = process.env.FORMSPREE_ID;
    if (formspreeId) {
      const formspreeData = new FormData();
      Object.entries(validatedData).forEach(([key, value]) => {
        formspreeData.append(key, value);
      });
      
      if (attachment) {
        const blob = new Blob([attachment.content], { type: 'application/octet-stream' });
        formspreeData.append('drawing', blob, attachment.filename);
      }

      const formspreeResponse = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: formspreeData,
      });

      if (formspreeResponse.ok) {
        return NextResponse.json({ 
          message: 'Quote request submitted successfully via Formspree' 
        });
      } else {
        throw new Error('Formspree submission failed');
      }
    }

    // If both methods fail
    return NextResponse.json(
      { message: 'Email service unavailable. Please contact us directly.' },
      { status: 500 }
    );

  } catch (error) {
    console.error('RFQ submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid form data', errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
