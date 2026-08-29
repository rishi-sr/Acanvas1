import express from 'express';
import { getAllBooks, createBook, updateBook, deleteBook, uploadBookCover } from '../controllers/bookController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { bookCrudValidation, validateRequest } from '../middleware/validator.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', authenticateToken, requireAdmin, bookCrudValidation, validateRequest, createBook);
router.put('/:id', authenticateToken, requireAdmin, updateBook);
router.delete('/:id', authenticateToken, requireAdmin, deleteBook);
router.post('/:id/upload-cover', authenticateToken, requireAdmin, uploadImage.single('cover'), uploadBookCover);

export default router;

