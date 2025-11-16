import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  size: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  }
});

export default mongoose.model('Pdf', pdfSchema);