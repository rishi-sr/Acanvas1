import express from 'express';
import { login, getMe, logout, changePassword } from '../controllers/authController.js';
import { authLimiter, authSpeedLimiter } from '../middleware/rateLimiter.js';
import { loginValidation, changePasswordValidation, validateRequest } from '../middleware/validator.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', authLimiter, authSpeedLimiter, loginValidation, validateRequest, login);

// GET /api/auth/me
router.get('/me', authenticateToken, getMe);

// PUT /api/auth/change-password
router.put('/change-password', authenticateToken, requireAdmin, changePasswordValidation, validateRequest, changePassword);

// POST /api/auth/logout
router.post('/logout', logout);

export default router;

