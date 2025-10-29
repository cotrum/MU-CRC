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

    const { name } = req.body; // Custom name from user
    
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
    res.status(500).json({ error: 'Failed to upload PDF' });
  }
});

// Get all PDFs endpoint
router.get('/pdfs', async (req, res) => {
  try {
    const pdfs = await Pdf.find().sort({ uploadDate: -1 });
    res.json(pdfs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch PDFs' });
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
    res.status(500).json({ error: 'Failed to update PDF' });
  }
});

export default router;