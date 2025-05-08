// src/routes/authRoutes.js
import express from 'express';
import { login, signup } from '../controllers/authController.js'; // We'll create this controller next

const router = express.Router();

// POST route for login
router.post('/login', login);
// POST route for signup
router.post('/signup', signup);
// POST route for logout
router.post('/logout', (req, res) => {
  // Handle logout logic here
  // For example, destroy the session or token
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

export default router;