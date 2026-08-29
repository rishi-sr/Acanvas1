import express from 'express';
import { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry } from '../controllers/inquiryController.js';
import { submissionLimiter } from '../middleware/rateLimiter.js';
import { botHoneypotTrap, sanitizeBody, contactValidation, validateRequest } from '../middleware/validator.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/',
  submissionLimiter,
  botHoneypotTrap,
  sanitizeBody,
  contactValidation,
  validateRequest,
  createInquiry
);

router.get('/', authenticateToken, requireAdmin, getInquiries);
router.put('/:id/status', authenticateToken, requireAdmin, updateInquiryStatus);
router.delete('/:id', authenticateToken, requireAdmin, deleteInquiry);

export default router;

