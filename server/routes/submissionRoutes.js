import express from 'express';
import {
  submitPoem,
  getSubmissions,
  updateSubmissionStatus,
  approveAndPublishSubmission,
  deleteSubmission
} from '../controllers/submissionController.js';
import { submissionLimiter } from '../middleware/rateLimiter.js';
import { botHoneypotTrap, sanitizeBody, submitPoemValidation, validateRequest } from '../middleware/validator.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/poem',
  submissionLimiter,
  botHoneypotTrap,
  sanitizeBody,
  submitPoemValidation,
  validateRequest,
  submitPoem
);

router.get('/', authenticateToken, requireAdmin, getSubmissions);
router.put('/:id/status', authenticateToken, requireAdmin, updateSubmissionStatus);
router.post('/:id/approve', authenticateToken, requireAdmin, approveAndPublishSubmission);
router.delete('/:id', authenticateToken, requireAdmin, deleteSubmission);

export default router;

