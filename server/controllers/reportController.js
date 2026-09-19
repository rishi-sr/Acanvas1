import { db } from '../config/db.js';

export const getAllReports = async (req, res) => {
  try {
    const reports = await db.getCollection('reports');
    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not fetch reports' });
  }
};

export const createReport = async (req, res) => {
  try {
    const { title, media, date, location, category, badge, excerpt, tags } = req.body;

    const newReport = {
      id: `report-${Date.now()}`,
      title: title || 'साहित्यिक समाचार',
      media: media || 'राष्ट्रीय साहित्य मंच',
      date: date || '',
      location: location || '',
      category: category || 'media',
      badge: badge || 'मुख्य समाचार',
      excerpt: excerpt || '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [])
    };

    const saved = await db.addItem('reports', newReport);
    return res.status(201).json({
      success: true,
      message: 'Report created successfully',
      data: saved
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to create report' });
  }
};

export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map(t => t.trim()).filter(Boolean);
    }

    const updated = await db.updateItem('reports', id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Report updated successfully',
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update report' });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteItem('reports', id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }
    return res.status(200).json({ success: true, message: 'Report deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete report' });
  }
};

