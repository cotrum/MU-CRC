
import mongoose from 'mongoose';

const PdfSchema = new mongoose.Schema({
  ctfName: { type: String, required: true },          // e.g., "HTB Cyber Apocalypse"
  challengeName: { type: String, required: true },    // e.g., "Ancient RSA"
  filename: String,
  originalName: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now },
  visible: { type: Boolean, default: true },
});

export default mongoose.model('Pdf', PdfSchema);