import express from 'express';
import { exportDatabase, importDatabase, resetDatabase, getSystemStatus } from '../controllers/adminController.js';
import { exportDatabase, importDatabase, resetDatabase, getSystemStatus, testEmailService } from '../controllers/adminController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/status', getSystemStatus);
router.get('/test-email', testEmailService);
router.get('/export', authenticateToken, requireAdmin, exportDatabase);
router.post('/import', authenticateToken, requireAdmin, importDatabase);
router.post('/reset', authenticateToken, requireAdmin, resetDatabase);

export default router;

