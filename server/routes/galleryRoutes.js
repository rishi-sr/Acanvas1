import express from 'express';
import {
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  uploadGalleryImage
} from '../controllers/galleryController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllGalleryItems);
router.post('/', authenticateToken, requireAdmin, createGalleryItem);
router.put('/:id', authenticateToken, requireAdmin, updateGalleryItem);
router.delete('/:id', authenticateToken, requireAdmin, deleteGalleryItem);
router.post('/upload', authenticateToken, requireAdmin, uploadImage.single('image'), uploadGalleryImage);

export default router;

