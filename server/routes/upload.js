import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';
import Pdf from '../models/Pdf.js';

const router = express.Router();

// Use memory storage instead of disk storage
const upload = multer({ storage: multer.memoryStorage() });

// Initialize GridFS bucket
let bucket;
mongoose.connection.once('open', () => {
  bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'pdfs'
  });
});


// ----------------- LIST ALL PDF WRITEUPS -----------------
router.get('/pdfs', async (req, res) => {
  const pdfs = await Pdf.find().sort({ uploadDate: -1 });
  res.json(pdfs);
});


// ----------------- LIST ALL CTF NAMES -----------------
router.get('/ctf-names', async (req, res) => {
  const names = await Pdf.distinct('ctfName');
  res.json(names);
});


// ----------------- UPLOAD A WRITEUP -----------------
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: 'No PDF uploaded' });

    const { ctfName, challengeName } = req.body;

    // Create upload stream to GridFS
    const uploadStream = bucket.openUploadStream(req.file.originalname, {
      metadata: { 
        ctfName, 
        challengeName,
        contentType: 'application/pdf'
      }
    });

    // Write buffer to GridFS
    uploadStream.end(req.file.buffer);

    uploadStream.on('finish', async () => {
      // Save metadata to Pdf collection
      const pdf = new Pdf({
        ctfName,
        challengeName,
        originalName: req.file.originalname,
        filename: uploadStream.id.toString(), // Store GridFS file ID
        size: req.file.size,
      });

      await pdf.save();

      res.status(201).json({
        message: "Writeup uploaded successfully!",
        pdf
      });
    });

    uploadStream.on('error', (err) => {
      res.status(500).json({ error: 'Upload failed', message: err.message });
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ----------------- SERVE/VIEW PDF FILE -----------------
router.get('/pdfs/view/:filename', async (req, res) => {
  try {
    const downloadStream = bucket.openDownloadStream(
      new mongoose.Types.ObjectId(req.params.filename)
    );
    
    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'inline'); // Display in browser instead of download
    
    downloadStream.pipe(res);

    downloadStream.on('error', (err) => {
      res.status(404).json({ error: 'PDF not found', message: err.message });
    });

  } catch (err) {
    res.status(404).json({ error: 'PDF not found', message: err.message });
  }
});


// ----------------- DELETE WRITEUP -----------------
router.delete('/pdfs/:id', async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    
    if (!pdf) {
      return res.status(404).json({ error: 'Writeup not found' });
    }

    // Delete from GridFS
    await bucket.delete(new mongoose.Types.ObjectId(pdf.filename));
    
    // Delete metadata from Pdf collection
    await Pdf.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Writeup deleted" });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed', message: err.message });
  }
});

export default router;