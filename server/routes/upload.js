import express from 'express';
import multer from 'multer';
import path from 'path';
import Pdf from '../models/Pdf.js';

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'pdf-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

// Upload PDF endpoint
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { name } = req.body;
    
    const pdf = new Pdf({
      name: name || req.file.originalname,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    });

    await pdf.save();
    
    res.status(201).json({
      message: 'PDF uploaded successfully',
      pdf: {
        id: pdf._id,
        name: pdf.name,
        uploadDate: pdf.uploadDate,
        size: pdf.size
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload PDF', details: error.message });
  }
});

// Get all PDFs endpoint - FIXED with better error handling
router.get('/pdfs', async (req, res) => {
  try {
    console.log('Fetching PDFs from database...');
    const pdfs = await Pdf.find().sort({ uploadDate: -1 });
    console.log(`Found ${pdfs.length} PDFs`);
    res.json(pdfs);
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch PDFs',
      details: error.message 
    });
  }
});

// Update PDF name endpoint
router.put('/pdfs/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const pdf = await Pdf.findByIdAndUpdate(
      req.params.id,
      { 
        name,
        lastUpdated: new Date()
      },
      { new: true }
    );

    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    res.json({ message: 'PDF updated successfully', pdf });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Failed to update PDF', details: error.message });
  }
});

export default router;