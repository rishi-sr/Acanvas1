import express from 'express';
import {
  getAllReports,
  createReport,
  updateReport,
  deleteReport
} from '../controllers/reportController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllReports);
router.post('/', authenticateToken, requireAdmin, createReport);
router.put('/:id', authenticateToken, requireAdmin, updateReport);
router.delete('/:id', authenticateToken, requireAdmin, deleteReport);

export default router;
