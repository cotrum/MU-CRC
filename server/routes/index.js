import express from 'express';
import uploadRoutes from './upload.js';

const router = express.Router();

// Main API welcome route
router.get('/', (req, res) => {
  res.json({ message: "Welcome to the organization's API!" });
});

// Mount upload routes under /upload path to avoid conflicts
router.use('/', uploadRoutes);

export default router;
