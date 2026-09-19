import { db } from '../config/db.js';

export const getAllWorkshops = async (req, res) => {
  try {
    const workshops = await db.getCollection('workshops');
    return res.status(200).json({
      success: true,
      count: workshops.length,
      data: workshops
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not fetch workshops' });
  }
};

export const createWorkshop = async (req, res) => {
  try {
    const { title, mentor, date, time, mode, type, desc, highlights, enrollLink } = req.body;

    const newWorkshop = {
      id: `workshop-${Date.now()}`,
      title: title || 'साहित्यिक कार्यशाला',
      mentor: mentor || 'डॉ. कंचन जायसवाल एवं गरिमा सिंह',
      date: date || '',
      time: time || '',
      mode: mode || 'हाइब्रिड (ऑनलाइन / ऑफलाइन)',
      type: type || 'poetry',
      desc: desc || '',
      highlights: Array.isArray(highlights) ? highlights : (highlights ? highlights.split('\n').filter(h => h.trim()) : []),
      enrollLink: enrollLink || '/contact'
    };

    const saved = await db.addItem('workshops', newWorkshop);
    return res.status(201).json({
      success: true,
      message: 'Workshop added successfully',
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create workshop' });
  }
};

export const updateWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.highlights && typeof updates.highlights === 'string') {
      updates.highlights = updates.highlights.split('\n').filter(h => h.trim());
    }

    const updated = await db.updateItem('workshops', id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Workshop not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Workshop updated successfully',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update workshop' });
  }
};

export const deleteWorkshop = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteItem('workshops', id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Workshop not found' });
    }
    return res.status(200).json({ success: true, message: 'Workshop deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete workshop' });
  }
};

