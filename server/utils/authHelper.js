import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const getUserFromToken = async (req) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id).select('-passwordHash');
    return user;
  } catch (err) {
    console.error('Token verification error:', err);
    return null;
  }
};