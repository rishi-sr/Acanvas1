import express from 'express';
import { getAllPoems, getPoemById, createPoem, updatePoem, deletePoem, togglePoemLike } from '../controllers/poemController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { poemCrudValidation, validateRequest } from '../middleware/validator.js';
import { likeLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', getAllPoems);
router.get('/:id', getPoemById);
router.post('/', authenticateToken, requireAdmin, poemCrudValidation, validateRequest, createPoem);
router.put('/:id', authenticateToken, requireAdmin, updatePoem);
router.delete('/:id', authenticateToken, requireAdmin, deletePoem);
router.post('/:id/like', likeLimiter, togglePoemLike);

export default router;

