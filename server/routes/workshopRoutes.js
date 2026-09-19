import express from 'express';
import {
  getAllWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop
} from '../controllers/workshopController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllWorkshops);
router.post('/', authenticateToken, requireAdmin, createWorkshop);
router.put('/:id', authenticateToken, requireAdmin, updateWorkshop);
router.delete('/:id', authenticateToken, requireAdmin, deleteWorkshop);

export default router;
