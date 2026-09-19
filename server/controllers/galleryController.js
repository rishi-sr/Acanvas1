import { db } from '../config/db.js';
import { uploadImageToCloud } from '../services/cloudinaryService.js';

export const getAllGalleryItems = async (req, res) => {
  try {
    const items = await db.getCollection('gallery');
    return res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not fetch gallery items' });
  }
};

export const createGalleryItem = async (req, res) => {
  try {
    const { title, category, date, location, image, aspectRatio, caption } = req.body;

    const newItem = {
      id: `gallery-${Date.now()}`,
      title: title || 'साहित्यिक क्षण',
      category: category || 'stage',
      date: date || '2026',
      location: location || '',
      image: image || '/assets/kanchan-portrait.png',
      aspectRatio: aspectRatio || '1:1', // '1:1' | '16:9' | '9:16'
      caption: caption || ''
    };

    const saved = await db.addItem('gallery', newItem);
    return res.status(201).json({
      success: true,
      message: 'Gallery item added successfully',
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create gallery item' });
  }
};

export const updateGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await db.updateItem('gallery', id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Gallery item updated successfully',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update gallery item' });
  }
};

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteItem('gallery', id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    return res.status(200).json({ success: true, message: 'Gallery item deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete gallery item' });
  }
};

export const uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    const imageUrl = await uploadImageToCloud(req.file, 'akshar_gallery');
    return res.status(200).json({
      success: true,
      message: 'Gallery image uploaded successfully',
      imageUrl
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to upload image' });
  }
};

