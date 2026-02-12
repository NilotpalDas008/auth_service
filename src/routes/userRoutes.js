import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Example of a protected route
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

export default router;