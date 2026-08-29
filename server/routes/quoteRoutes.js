import express from 'express';
import { getAllQuotes, createQuote, updateQuote, deleteQuote, toggleQuoteLike } from '../controllers/quoteController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { quoteCrudValidation, validateRequest } from '../middleware/validator.js';
import { likeLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', getAllQuotes);
router.post('/', authenticateToken, requireAdmin, quoteCrudValidation, validateRequest, createQuote);
router.put('/:id', authenticateToken, requireAdmin, updateQuote);
router.delete('/:id', authenticateToken, requireAdmin, deleteQuote);
router.post('/:id/like', likeLimiter, toggleQuoteLike);

export default router;

