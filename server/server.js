import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json()) // Parse JSON bodies

// --- Example route ---
app.get('/api', (req, res) => {
  res.json({ message: 'Server is running!' })
})

// --- Example MongoDB connection ---
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err))

// --- Start server ---
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
