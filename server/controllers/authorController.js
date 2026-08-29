import { db } from '../config/db.js';
import { uploadImageToCloud } from '../services/cloudinaryService.js';

/**
 * Retrieve all author profiles
 */
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await db.getAuthors();
    return res.status(200).json({
      success: true,
      data: authors
    });
  } catch (error) {
    console.error('Error fetching authors:', error);
    return res.status(500).json({ success: false, message: 'Could not retrieve authors' });
  }
};

/**
 * Retrieve single author profile
 */
export const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await db.getAuthorById(id);
    if (!author) {
      return res.status(404).json({ success: false, message: `Author '${id}' not found` });
    }
    return res.status(200).json({
      success: true,
      data: author
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not retrieve author' });
  }
};

/**
 * Update author profile (Admin protected)
 */
export const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const existing = await db.getAuthorById(id);
    if (!existing && id !== 'kanchan' && id !== 'garima' && id !== 'synergy') {
      return res.status(404).json({ success: false, message: `Author '${id}' not found` });
    }

    const updatedAuthor = await db.updateAuthor(id, updates);
    return res.status(200).json({
      success: true,
      message: `Author profile '${id}' updated successfully.`,
      data: updatedAuthor
    });
  } catch (error) {
    console.error('Error updating author:', error);
    return res.status(500).json({ success: false, message: 'Failed to update author' });
  }
};

/**
 * Upload author portrait image (Admin protected)
 * Automatically uploads to Cloudinary (if configured) or local storage
 */
export const uploadAuthorImage = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    // Upload to Cloudinary or local storage
    const avatarUrl = await uploadImageToCloud(req.file, 'akshar_authors');
    const updatedAuthor = await db.updateAuthor(id, { avatarUrl });

    return res.status(200).json({
      success: true,
      message: 'Author portrait image uploaded successfully',
      avatarUrl,
      data: updatedAuthor
    });
  } catch (error) {
    console.error('Error uploading author image:', error);
    return res.status(500).json({ success: false, message: 'Failed to upload author image' });
  }
};

