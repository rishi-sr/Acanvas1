import express from 'express';
import {
  getAllSamkalieen,
  createSamkalieen,
  updateSamkalieen,
  deleteSamkalieen
} from '../controllers/samkalieenController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllSamkalieen);
router.post('/', authenticateToken, requireAdmin, createSamkalieen);
router.put('/:id', authenticateToken, requireAdmin, updateSamkalieen);
router.delete('/:id', authenticateToken, requireAdmin, deleteSamkalieen);

export default router;

