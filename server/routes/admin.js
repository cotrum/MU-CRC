import express from 'express';
import User from '../models/User.js';
import { getUserFromToken } from '../utils/authHelper.js';

const router = express.Router();

// GET /admin/users - Get all users (admin only)
router.get('/admin/users', async (req, res) => {
  try {
    // Check if user is admin
    const user = await getUserFromToken(req);
    
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Access denied. Admin privileges required.' 
      });
    }

    // Exclude passwordHash from results
    const users = await User.find({}, '-passwordHash');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// PUT /admin/users/:id/role - Update user role (admin only)
router.put('/admin/users/:id/role', async (req, res) => {
  try {
    // Check if user is admin
    const adminUser = await getUserFromToken(req);
    
    if (!adminUser) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (adminUser.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Access denied. Admin privileges required.' 
      });
    }

    const { id } = req.params;
    const { role } = req.body;

    // Validate role
    const validRoles = ['nonmember', 'member', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Prevent admin from changing their own role (optional safety)
    if (id === adminUser._id.toString()) {
      return res.status(400).json({ error: 'Cannot change your own role' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, select: '-passwordHash' }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ 
      message: 'User role updated successfully',
      user 
    });
  } catch (err) {
    console.error('Error updating user role:', err);
    res.status(500).json({ error: 'Failed to update user role' });
  }
});

export default router;