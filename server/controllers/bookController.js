import { db } from '../config/db.js';
import { uploadImageToCloud } from '../services/cloudinaryService.js';

export const getAllBooks = async (req, res) => {
  try {
    const books = await db.getCollection('books');
    return res.status(200).json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not fetch books' });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, titleHindi, author, authorHindi, status, year, expectedDate, publisher, pages, isbn, price, tagline, synopsis, sampleExcerpt, coverGradient, accentColor, buyLinks } = req.body;

    const newBook = {
      id: `book-${Date.now()}`,
      title,
      titleHindi: titleHindi || title,
      author: author || 'Kanchan Lata Jaiswal',
      authorHindi: authorHindi || author,
      status: status || 'published',
      year: year || '2026',
      expectedDate: expectedDate || '',
      pages: parseInt(pages, 10) || 200,
      isbn: isbn || '978-93-XXXXX-XX-X',
      publisher: publisher || 'Akshar Canvas Publications',
      tagline: tagline || '',
      synopsis: synopsis || '',
      sampleExcerpt: sampleExcerpt || '',
      coverGradient: coverGradient || 'linear-gradient(145deg, #8B0000 0%, #3B050B 100%)',
      accentColor: accentColor || '#C5A059',
      price: price || '₹299',
      rating: 5.0,
      reviewsCount: 1,
      buyLinks: buyLinks || { amazon: '#', flipkart: '#' }
    };

    const saved = await db.addItem('books', newBook);
    return res.status(201).json({
      success: true,
      message: 'Book added to catalog',
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create book' });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await db.updateItem('books', id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update book' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteItem('books', id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    return res.status(200).json({ success: true, message: 'Book deleted from catalog' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete book' });
  }
};

export const uploadBookCover = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No cover image file uploaded' });
    }

    const coverUrl = await uploadImageToCloud(req.file, 'akshar_books');
    const updated = await db.updateItem('books', id, { coverImageUrl: coverUrl });

    return res.status(200).json({
      success: true,
      message: 'Cover image uploaded successfully',
      coverUrl,
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to upload cover' });
  }
};

