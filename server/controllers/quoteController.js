import { db } from '../config/db.js';

export const getAllQuotes = async (req, res) => {
  try {
    const quotes = await db.getCollection('quotes');
    return res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not fetch quotes' });
  }
};

export const createQuote = async (req, res) => {
  try {
    const { quote, originalVerse, author, authorHindi, sourceBook, curatedBy, poetReflection, aksharCanvasReview, tags } = req.body;

    const newQuote = {
      id: `quote-${Date.now()}`,
      quote,
      originalVerse: originalVerse || quote,
      author,
      authorHindi: authorHindi || author,
      sourceBook: sourceBook || '',
      sourceType: 'curated',
      curatedBy: curatedBy || 'Kanchan Lata Jaiswal',
      poetReflection: poetReflection || '',
      aksharCanvasReview: aksharCanvasReview || poetReflection || '',
      tags: Array.isArray(tags) ? tags : (tags ? String(tags).split(',').map(t => t.trim()) : ['Literature']),
      likes: 0,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    const saved = await db.addItem('quotes', newQuote);
    return res.status(201).json({
      success: true,
      message: 'Quote archived successfully',
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create quote' });
  }
};

export const updateQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map(t => t.trim());
    }

    const updated = await db.updateItem('quotes', id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Quote updated successfully',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update quote' });
  }
};

export const deleteQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteItem('quotes', id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }
    return res.status(200).json({ success: true, message: 'Quote deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete quote' });
  }
};

export const toggleQuoteLike = async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await db.getItemById('quotes', id);
    if (!quote) {
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }

    const newLikes = (quote.likes || 0) + 1;
    const updated = await db.updateItem('quotes', id, { likes: newLikes });

    return res.status(200).json({
      success: true,
      likes: updated.likes
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not toggle like' });
  }
};

