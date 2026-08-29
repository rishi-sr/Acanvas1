import express from 'express';
import { login, getMe, logout } from '../controllers/authController.js';
import { authLimiter, authSpeedLimiter } from '../middleware/rateLimiter.js';
import { loginValidation, validateRequest } from '../middleware/validator.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', authLimiter, authSpeedLimiter, loginValidation, validateRequest, login);

// GET /api/auth/me
router.get('/me', authenticateToken, getMe);

// POST /api/auth/logout
router.post('/logout', logout);

export default router;

