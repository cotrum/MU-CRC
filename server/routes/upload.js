import express from 'express';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import Pdf from '../models/Pdf.js';

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });


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

    const pdf = new Pdf({
      ctfName,
      challengeName,
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
    });

    await pdf.save();

    res.status(201).json({
      message: "Writeup uploaded successfully!",
      pdf
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ----------------- DELETE WRITEUP -----------------
router.delete('/pdfs/:id', async (req, res) => {
  try {
    await Pdf.findByIdAndDelete(req.params.id);
    res.json({ message: "Writeup deleted" });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

export default router;
