import { db } from '../config/db.js';

export const getAllSamkalieen = async (req, res) => {
  try {
    const articles = await db.getCollection('samkalieen');
    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not fetch samkalieen articles' });
  }
};

export const createSamkalieen = async (req, res) => {
  try {
    const { title, author, category, date, readTime, lead, paragraphs, quote } = req.body;

    let paragraphsArr = [];
    if (Array.isArray(paragraphs)) {
      paragraphsArr = paragraphs;
    } else if (typeof paragraphs === 'string') {
      paragraphsArr = paragraphs.split('\n\n').map(p => p.trim()).filter(Boolean);
    }

    const newArticle = {
      id: `samkalieen-${Date.now()}`,
      title: title || 'समकालीन आलेख',
      author: author || 'डॉ. कंचन जायसवाल',
      category: category || 'दार्शनिक चिंतन',
      date: date || '',
      readTime: readTime || '5 मिनट पाठ',
      lead: lead || '',
      paragraphs: paragraphsArr,
      quote: quote || ''
    };

    const saved = await db.addItem('samkalieen', newArticle);
    return res.status(201).json({
      success: true,
      message: 'Samkalieen article created successfully',
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create samkalieen article' });
  }
};

export const updateSamkalieen = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.paragraphs && typeof updates.paragraphs === 'string') {
      updates.paragraphs = updates.paragraphs.split('\n\n').map(p => p.trim()).filter(Boolean);
    }

    const updated = await db.updateItem('samkalieen', id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Article updated successfully',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update article' });
  }
};

export const deleteSamkalieen = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteItem('samkalieen', id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }
    return res.status(200).json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete article' });
  }
};
