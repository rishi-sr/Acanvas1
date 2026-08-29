import express from 'express';
import { getAllAuthors, getAuthorById, updateAuthor, uploadAuthorImage } from '../controllers/authorController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { authorUpdateValidation, validateRequest } from '../middleware/validator.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.put('/:id', authenticateToken, requireAdmin, authorUpdateValidation, validateRequest, updateAuthor);
router.post('/:id/upload-image', authenticateToken, requireAdmin, uploadImage.single('image'), uploadAuthorImage);

export default router;

