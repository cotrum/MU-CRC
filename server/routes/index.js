import express from 'express';
import uploadRoutes from './upload.js';
import authRoutes from './auth.js';

const router = express.Router();

// Main API welcome route
router.get('/', (req, res) => {
  res.json({ message: "Welcome to the organization's API!" });
});

// Authentication routes (login, register)
router.use('/auth', authRoutes);

// Upload routes
router.use('/upload', uploadRoutes);

export default router;
