import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Serve uploaded files statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Server is running!' })
})

// Test route to check if API is working
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' })
})

// Import and use upload routes
import uploadRoutes from './routes/upload.js'
app.use('/api', uploadRoutes)

// MongoDB connection with better timeout handling
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/pdfmanager'

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of 30
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully')
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`)
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err)
    console.log('💡 Please make sure:')
    console.log('   1. MongoDB is installed and running')
    console.log('   2. Your MONGO_URI in .env file is correct')
    console.log('   3. MongoDB is accessible on localhost:27017')
  })

// Create uploads directory if it doesn't exist
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('✅ Created uploads directory')
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📁 Upload directory: ${path.join(__dirname, 'uploads')}`)
})