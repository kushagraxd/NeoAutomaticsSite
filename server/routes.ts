import type { Express } from "express";
import multer from "multer";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";
import { z } from "zod";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import pdfParse from 'pdf-parse';
import { getClient, moderate, trimTokens, estimateTokens } from '../lib/openai';
import { limitOrThrow } from '../lib/ratelimit';
import { logger, createRequestLogger, logAiUsage } from '../lib/logger';
import { formatCapabilitiesForAI } from '../lib/company';
import { nearestProducts } from '../lib/embeddings';

// RFQ form validation schema - updated to match ProductQuoteModal fields
const rfqSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  product: z.string().min(1, "Product selection is required"),
  annualVolume: z.string().min(1, "Annual volume is required"),
  material: z.string().optional(),
  surfaceFinish: z.string().optional(),
  targetPrice: z.string().optional(),
  message: z.string().optional(),
  // Additional fields from modal
  productCategory: z.string().optional(),
  productDescription: z.string().optional(),
  // AI-generated summary
  aiSummary: z.string().optional(),
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
    
    const allowedExtensions = ['.dwg', '.dxf', '.step', '.stp'];
    const hasAllowedExtension = allowedExtensions.some(ext => 
      file.originalname.toLowerCase().endsWith(ext)
    );
    
    if (allowedTypes.includes(file.mimetype) || hasAllowedExtension) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type: ${file.mimetype}. Only PDF, Excel, Images, DWG, DXF, and STEP files are allowed.`));
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
        product: req.body.product,
        annualVolume: req.body.annualVolume,
        material: req.body.material || '',
        surfaceFinish: req.body.surfaceFinish || '',
        targetPrice: req.body.targetPrice || '',
        message: req.body.message || '',
        productCategory: req.body.productCategory || '',
        productDescription: req.body.productDescription || '',
        aiSummary: req.body.aiSummary || '',
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

          const emailContent = `${validatedData.aiSummary ? `
=== AI SUMMARY FOR SALES TEAM ===
${validatedData.aiSummary}
======================================

` : ''}New RFQ Request from ${validatedData.name}

Company: ${validatedData.company}
Email: ${validatedData.email}
Phone: ${validatedData.phone}

Product Details:
- Product: ${validatedData.product}${validatedData.productCategory ? ` (${validatedData.productCategory})` : ''}
- Annual Volume: ${validatedData.annualVolume}
${validatedData.material ? `- Material: ${validatedData.material}` : ''}
${validatedData.surfaceFinish ? `- Surface Finish: ${validatedData.surfaceFinish}` : ''}
${validatedData.targetPrice ? `- Target Price: ${validatedData.targetPrice}` : ''}

${validatedData.message ? `Additional Message:\n${validatedData.message}` : ''}

${attachment ? `\nTechnical drawing attached: ${attachment.filename}` : 'No technical drawing provided'}

---
Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
`;

          const mailOptions = {
            from: `"Neo Automatics RFQ" <${smtpUser}>`,
            to: toEmail,
            replyTo: validatedData.email,
            subject: `New RFQ Request from ${validatedData.company} - ${validatedData.product}`,
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
        const formspreeUrl = process.env.FORMSPREE_URL;
        
        // Only attempt Formspree if a valid URL is configured
        if (formspreeUrl && !formspreeUrl.includes('YOUR_FORM_ID')) {
          try {
            console.log('Attempting to send email via Formspree fallback...');
            
            const formData = new FormData();
            formData.append('name', validatedData.name);
            formData.append('company', validatedData.company);
            formData.append('email', validatedData.email);
            formData.append('phone', validatedData.phone);
            formData.append('product', validatedData.product);
            formData.append('annualVolume', validatedData.annualVolume);
            formData.append('material', validatedData.material || '');
            formData.append('message', validatedData.message || '');
            if (validatedData.aiSummary) {
              formData.append('aiSummary', validatedData.aiSummary);
            }
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
        } else {
          console.log('Formspree not configured - skipping email fallback in development');
        }
      }

      // In development mode, always treat as successful for testing purposes
      if (!emailSent && process.env.NODE_ENV === 'development') {
        console.log('Development mode: simulating successful email delivery for testing');
        emailSent = true;
        
        // Log the RFQ details for development debugging
        console.log('=== RFQ SUBMISSION (Development) ===');
        if (validatedData.aiSummary) {
          console.log(`AI Summary: ${validatedData.aiSummary}`);
          console.log('-------------------------------------');
        }
        console.log(`From: ${validatedData.name} (${validatedData.company})`);
        console.log(`Email: ${validatedData.email} | Phone: ${validatedData.phone}`);
        console.log(`Product: ${validatedData.product}`);
        console.log(`Annual Volume: ${validatedData.annualVolume}`);
        if (validatedData.material) console.log(`Material: ${validatedData.material}`);
        if (validatedData.surfaceFinish) console.log(`Surface Finish: ${validatedData.surfaceFinish}`);
        if (validatedData.targetPrice) console.log(`Target Price: ${validatedData.targetPrice}`);
        if (validatedData.message) console.log(`Message: ${validatedData.message}`);
        if (attachment) console.log(`File: ${attachment.filename} (${attachment.content.length} bytes)`);
        console.log('===================================');
      }

      // Return response based on email delivery success
      if (emailSent) {
        res.json({
          success: true,
          message: 'Quote request submitted successfully. We\'ll contact you within 24 hours.',
          data: {
            submittedAt: new Date().toISOString(),
            company: validatedData.company,
            product: validatedData.product,
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
            product: validatedData.product,
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

  // AI API Routes
  
  // Helper function to get client IP
  const getClientIP = (req: any) => {
    return req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 
           (req.connection.socket ? req.connection.socket.remoteAddress : null) || '127.0.0.1';
  };

  // AI Chat endpoint
  app.post('/api/ai/chat', async (req, res) => {
    const startTime = Date.now();
    const requestId = uuidv4();
    const clientLogger = logger.child({ requestId });
    
    try {
      const ip = getClientIP(req);
      await limitOrThrow(ip, 'chat');

      const schema = z.object({
        messages: z.array(z.object({
          role: z.enum(['user', 'assistant', 'system']),
          content: z.string().min(1).max(4000)
        })).min(1).max(20),
        context: z.object({
          product: z.string().optional()
        }).optional()
      });

      const { messages, context } = schema.parse(req.body);

      // Moderate user messages
      const userMessages = messages.filter(m => m.role === 'user');
      for (const msg of userMessages) {
        await moderate(msg.content);
      }

      const companyContext = formatCapabilitiesForAI();
      const systemPrompt = `You are "Neo AI", a procurement assistant for ${companyContext}. 
Answer concisely for buyers. If details are missing, ask for: annual volume, material grade, tolerance, surface finish, drawing. 
Offer to open the RFQ modal for quotes. Never invent capabilities we don't list.`;

      const completion = await getClient().chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(m => ({ role: m.role, content: trimTokens(m.content) }))
        ],
        temperature: 0.3,
        max_tokens: 500,
      });

      const reply = completion.choices[0]?.message?.content || 'I apologize, but I cannot provide a response at this time.';
      
      // Generate suggestions based on context
      const suggestions = context?.product 
        ? [`What's the lead time for ${context.product}?`, 'Can you share tolerance specs?', 'Request a quote for this part']
        : ['What products do you manufacture?', 'Tell me about your capabilities', 'How do I request a quote?'];

      logAiUsage({
        requestId,
        endpoint: '/api/ai/chat',
        model: 'gpt-4o-mini',
        promptTokens: completion.usage?.prompt_tokens,
        completionTokens: completion.usage?.completion_tokens,
        totalTokens: completion.usage?.total_tokens,
        duration: Date.now() - startTime,
        success: true,
      });

      res.json({ reply, suggestions });

    } catch (error: any) {
      clientLogger.error({ error: error.message }, 'AI chat error');
      
      logAiUsage({
        requestId,
        endpoint: '/api/ai/chat',
        model: 'gpt-4o-mini',
        duration: Date.now() - startTime,
        success: false,
        error: error.message,
      });

      if (error.message.includes('Rate limit exceeded') || error.message.includes('Content flagged')) {
        return res.status(400).json({ error: error.message, id: requestId });
      }

      res.status(500).json({ error: 'Something went wrong', id: requestId });
    }
  });

  // RFQ Helper endpoint
  app.post('/api/ai/rfq-helper', async (req, res) => {
    const startTime = Date.now();
    const requestId = uuidv4();
    const clientLogger = logger.child({ requestId });
    
    try {
      const ip = getClientIP(req);
      await limitOrThrow(ip, 'rfq-helper');

      const schema = z.object({
        product: z.string().min(1).max(200),
        annualVolume: z.string().optional(),
        material: z.string().optional(),
        finish: z.string().optional(),
        notes: z.string().optional(),
      });

      const data = schema.parse(req.body);

      // Moderate inputs
      const textToModerate = [data.product, data.material, data.finish, data.notes].filter(Boolean).join(' ');
      await moderate(textToModerate);

      const companyContext = formatCapabilitiesForAI();
      const prompt = `Based on ${companyContext}, provide RFQ suggestions for "${data.product}". 
      Current input: Volume: ${data.annualVolume || 'not specified'}, Material: ${data.material || 'not specified'}, Finish: ${data.finish || 'not specified'}.
      
      Respond with JSON only:
      {
        "suggested": {
          "annualVolume": "volume range recommendation",
          "material": "specific grade recommendation",
          "finish": "surface finish recommendation", 
          "leadTimeWeeks": number
        },
        "checklist": ["question1", "question2", "question3"],
        "cautions": ["caution1 if any"]
      }`;

      const completion = await getClient().chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 400,
      });

      let response;
      try {
        response = JSON.parse(completion.choices[0]?.message?.content || '{}');
      } catch {
        response = {
          suggested: {
            annualVolume: "1,000-10,000 units",
            material: "EN8 or equivalent",
            finish: "Black oxide coating",
            leadTimeWeeks: 4
          },
          checklist: ["PPAP level required?", "Drawing with tolerances?", "Surface roughness specs?"],
          cautions: ["Verify material compatibility with application"]
        };
      }

      logAiUsage({
        requestId,
        endpoint: '/api/ai/rfq-helper',
        model: 'gpt-4o-mini',
        promptTokens: completion.usage?.prompt_tokens,
        completionTokens: completion.usage?.completion_tokens,
        totalTokens: completion.usage?.total_tokens,
        duration: Date.now() - startTime,
        success: true,
      });

      res.json(response);

    } catch (error: any) {
      clientLogger.error({ error: error.message }, 'RFQ helper error');
      
      logAiUsage({
        requestId,
        endpoint: '/api/ai/rfq-helper',
        model: 'gpt-4o-mini',
        duration: Date.now() - startTime,
        success: false,
        error: error.message,
      });

      if (error.message.includes('Rate limit exceeded') || error.message.includes('Content flagged')) {
        return res.status(400).json({ error: error.message, id: requestId });
      }

      res.status(500).json({ error: 'Something went wrong', id: requestId });
    }
  });

  // PDF Extract endpoint
  app.post('/api/ai/extract', upload.single('file'), async (req, res) => {
    const startTime = Date.now();
    const requestId = uuidv4();
    const clientLogger = logger.child({ requestId });
    
    try {
      const ip = getClientIP(req);
      await limitOrThrow(ip, 'extract');

      if (!req.file) {
        return res.status(400).json({ error: 'PDF file is required' });
      }

      if (req.file.mimetype !== 'application/pdf') {
        return res.status(400).json({ error: 'Only PDF files are supported' });
      }

      if (req.file.size > 10 * 1024 * 1024) { // 10MB
        return res.status(400).json({ error: 'File size must be less than 10MB' });
      }

      // Parse PDF
      const pdfBuffer = fs.readFileSync(req.file.path);
      const pdfData = await pdfParse(pdfBuffer);
      
      // Clean up uploaded file
      fs.unlinkSync(req.file.path);

      // Extract first 12k characters
      const content = trimTokens(pdfData.text, 12000);

      const prompt = `Extract likely specs from this technical drawing/document. Focus on dimensions (mm), material grade, tolerance, finish, quantity.
      
      Document content:
      ${content}
      
      Respond with JSON only:
      {
        "summary": "brief summary of what was found",
        "fields": {
          "material": "extracted material if found",
          "dimensions": "key dimensions if found",
          "tolerance": "tolerance specs if found",
          "finish": "surface finish if found",
          "quantity": "quantity if found"
        }
      }`;

      const completion = await getClient().chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 300,
      });

      let response;
      try {
        response = JSON.parse(completion.choices[0]?.message?.content || '{}');
      } catch {
        response = {
          summary: "PDF processed but no specific manufacturing specs found",
          fields: {}
        };
      }

      logAiUsage({
        requestId,
        endpoint: '/api/ai/extract',
        model: 'gpt-4o-mini',
        promptTokens: completion.usage?.prompt_tokens,
        completionTokens: completion.usage?.completion_tokens,
        totalTokens: completion.usage?.total_tokens,
        duration: Date.now() - startTime,
        success: true,
      });

      res.json(response);

    } catch (error: any) {
      clientLogger.error({ error: error.message }, 'PDF extract error');
      
      // Clean up file if exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      logAiUsage({
        requestId,
        endpoint: '/api/ai/extract',
        model: 'gpt-4o-mini',
        duration: Date.now() - startTime,
        success: false,
        error: error.message,
      });

      if (error.message.includes('Rate limit exceeded') || error.message.includes('Content flagged')) {
        return res.status(400).json({ error: error.message, id: requestId });
      }

      res.status(500).json({ error: 'Something went wrong', id: requestId });
    }
  });

  // Semantic Search endpoint
  app.post('/api/ai/search', async (req, res) => {
    const startTime = Date.now();
    const requestId = uuidv4();
    const clientLogger = logger.child({ requestId });
    
    try {
      const ip = getClientIP(req);
      await limitOrThrow(ip, 'search');

      const schema = z.object({
        q: z.string().min(1).max(200),
      });

      const { q } = schema.parse(req.body);

      await moderate(q);

      const results = await nearestProducts(q, 5);

      logAiUsage({
        requestId,
        endpoint: '/api/ai/search',
        model: 'semantic-search',
        duration: Date.now() - startTime,
        success: true,
      });

      res.json({ results });

    } catch (error: any) {
      clientLogger.error({ error: error.message }, 'Semantic search error');
      
      logAiUsage({
        requestId,
        endpoint: '/api/ai/search',
        model: 'semantic-search',
        duration: Date.now() - startTime,
        success: false,
        error: error.message,
      });

      if (error.message.includes('Rate limit exceeded') || error.message.includes('Content flagged')) {
        return res.status(400).json({ error: error.message, id: requestId });
      }

      res.status(500).json({ error: 'Something went wrong', id: requestId });
    }
  });

  // Summary endpoint for internal mail
  app.post('/api/ai/summary', async (req, res) => {
    const startTime = Date.now();
    const requestId = uuidv4();
    const clientLogger = logger.child({ requestId });
    
    try {
      const ip = getClientIP(req);
      await limitOrThrow(ip, 'summary');

      // Accept RFQ data structure
      const rfqData = req.body;

      const prompt = `Create a 5-bullet summary for sales team from this RFQ:
      
      Company: ${rfqData.company}
      Contact: ${rfqData.name} (${rfqData.email})
      Product: ${rfqData.product}
      Volume: ${rfqData.annualVolume}
      Material: ${rfqData.material || 'Not specified'}
      
      Additional details: ${rfqData.message || 'None'}
      
      Format as:
      • Company & Contact info
      • Product & Volume requirements  
      • Material & Technical specs
      • Key Requirements/Notes
      • Recommended Next Steps`;

      const completion = await getClient().chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 200,
      });

      const summary = completion.choices[0]?.message?.content || 'Unable to generate summary';

      logAiUsage({
        requestId,
        endpoint: '/api/ai/summary',
        model: 'gpt-4o-mini',
        promptTokens: completion.usage?.prompt_tokens,
        completionTokens: completion.usage?.completion_tokens,
        totalTokens: completion.usage?.total_tokens,
        duration: Date.now() - startTime,
        success: true,
      });

      res.json({ summary });

    } catch (error: any) {
      clientLogger.error({ error: error.message }, 'Summary generation error');
      
      logAiUsage({
        requestId,
        endpoint: '/api/ai/summary',
        model: 'gpt-4o-mini',
        duration: Date.now() - startTime,
        success: false,
        error: error.message,
      });

      if (error.message.includes('Rate limit exceeded') || error.message.includes('Content flagged')) {
        return res.status(400).json({ error: error.message, id: requestId });
      }

      res.status(500).json({ error: 'Something went wrong', id: requestId });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
