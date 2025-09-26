import type { Express } from "express";
import multer from "multer";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
      // Log the received data for debugging
      console.log('RFQ submission received:', {
        body: req.body,
        file: req.file ? { 
          filename: req.file.filename, 
          originalName: req.file.originalname, 
          size: req.file.size, 
          mimetype: req.file.mimetype 
        } : null,
        fields: Object.keys(req.body)
      });

      // Extract form data
      const { name, company, email, phone, component, annualVolume, material, message } = req.body;

      // Basic validation
      if (!name || !company || !email || !phone || !component || !annualVolume || !material) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields'
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email address'
        });
      }

      // Here you would typically:
      // 1. Save to database
      // 2. Send email notification
      // 3. Process file upload
      // For now, we'll just log and return success

      console.log('Processing RFQ request:', {
        name,
        company,
        email,
        phone,
        component,
        annualVolume,
        material,
        message: message || 'N/A'
      });

      // Return success response
      res.json({
        success: true,
        message: 'Quote request submitted successfully',
        data: {
          submittedAt: new Date().toISOString(),
          company,
          component
        }
      });

    } catch (error) {
      console.error('RFQ submission error:', error);
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
