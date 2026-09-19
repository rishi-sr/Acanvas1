import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/settings - Public
router.get('/', getSettings);

// PUT /api/settings - Admin protected
router.put('/', authenticateToken, requireAdmin, updateSettings);

export default router;

