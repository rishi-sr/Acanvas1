import { db } from '../config/db.js';

export const getAllPoems = async (req, res) => {
  try {
    const { search, category, poet } = req.query;
    let poems = await db.getCollection('poems');

    if (search) {
      const q = String(search).toLowerCase().trim();
      poems = poems.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.titleHindi && p.titleHindi.toLowerCase().includes(q)) ||
        (p.poet && p.poet.toLowerCase().includes(q)) ||
        (p.book && p.book.toLowerCase().includes(q)) ||
        (Array.isArray(p.stanzas) && p.stanzas.some(s => s.toLowerCase().includes(q)))
      );
    }

    if (category && category !== 'all') {
      poems = poems.filter(p => p.category === category);
    }

    if (poet && poet !== 'all') {
      const poetQuery = String(poet).toLowerCase();
      poems = poems.filter(p => {
        const poetStr = (p.poet || '').toLowerCase();
        if (poetQuery === 'kanchan') return poetStr.includes('kanchan') && !poetStr.includes('garima');
        if (poetQuery === 'garima') return poetStr.includes('garima') && !poetStr.includes('kanchan');
        if (poetQuery === 'joint') return poetStr.includes('joint') || poetStr.includes('&') || (poetStr.includes('kanchan') && poetStr.includes('garima'));
        return true;
      });
    }

    return res.status(200).json({
      success: true,
      count: poems.length,
      data: poems
    });
  } catch (error) {
    console.error('Error getting poems:', error);
    return res.status(500).json({ success: false, message: 'Could not fetch poems' });
  }
};

export const getPoemById = async (req, res) => {
  try {
    const { id } = req.params;
    const poem = await db.getItemById('poems', id);
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }
    return res.status(200).json({ success: true, data: poem });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not fetch poem' });
  }
};

export const createPoem = async (req, res) => {
  try {
    const { title, titleHindi, poet, poetHindi, book, category, stanzas, originalHindiStanzas, excerpt, featured } = req.body;

    const stanzasArray = Array.isArray(stanzas)
      ? stanzas
      : (stanzas ? stanzas.split('\n\n').filter(s => s.trim()) : []);

    const newPoem = {
      id: `poem-${Date.now()}`,
      title,
      titleHindi: titleHindi || title,
      poet: poet || 'Kanchan Lata Jaiswal',
      poetHindi: poetHindi || poet || 'कंचन लता जायसवाल',
      book: book || '',
      category: category || 'Life Philosophy',
      featured: !!featured,
      excerpt: excerpt || (stanzasArray[0] ? stanzasArray[0].slice(0, 120) + '...' : ''),
      stanzas: stanzasArray,
      originalHindiStanzas: Array.isArray(originalHindiStanzas) ? originalHindiStanzas : stanzasArray,
      likes: 0,
      date: new Date().toISOString().split('T')[0],
      readTime: `${Math.max(1, Math.ceil(stanzasArray.join(' ').split(' ').length / 80))} min`
    };

    const saved = await db.addItem('poems', newPoem);
    return res.status(201).json({
      success: true,
      message: 'Poem published successfully',
      data: saved
    });
  } catch (error) {
    console.error('Error creating poem:', error);
    return res.status(500).json({ success: false, message: 'Failed to create poem' });
  }
};

export const updatePoem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.stanzas && typeof updates.stanzas === 'string') {
      updates.stanzas = updates.stanzas.split('\n\n').filter(s => s.trim());
    }

    const updated = await db.updateItem('poems', id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Poem updated successfully',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update poem' });
  }
};

export const deletePoem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteItem('poems', id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }
    return res.status(200).json({ success: true, message: 'Poem deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete poem' });
  }
};

export const togglePoemLike = async (req, res) => {
  try {
    const { id } = req.params;
    const poem = await db.getItemById('poems', id);
    if (!poem) {
      return res.status(404).json({ success: false, message: 'Poem not found' });
    }

    const currentLikes = poem.likes || 0;
    const newLikes = currentLikes + 1;
    const updated = await db.updateItem('poems', id, { likes: newLikes });

    return res.status(200).json({
      success: true,
      likes: updated.likes
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not toggle like' });
  }
};

