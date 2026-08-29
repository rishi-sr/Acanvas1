import { db } from '../config/db.js';
import { notifyContactInquiry } from '../services/emailService.js';

export const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, city, eventType, date, message } = req.body;

    const newInquiry = {
      id: `inq-${Date.now()}`,
      name,
      email,
      phone,
      city: city || '',
      eventType: eventType || 'General Literary Inquiry',
      date: date || 'Flexible',
      message,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };

    const saved = await db.addItem('inquiries', newInquiry);

    // Trigger automated email dispatch asynchronously
    notifyContactInquiry(saved).catch(err => {
      console.error('Contact inquiry notification dispatch error:', err);
    });

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Our team has been notified via email.',
      data: {
        id: saved.id,
        name: saved.name,
        submittedAt: saved.submittedAt
      }
    });
  } catch (error) {
    console.error('Error saving inquiry:', error);
    return res.status(500).json({ success: false, message: 'Failed to process inquiry' });
  }
};

export const getInquiries = async (req, res) => {
  try {
    const inquiries = await db.getCollection('inquiries');
    return res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not fetch inquiries' });
  }
};

export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const updated = await db.updateItem('inquiries', id, { status });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Inquiry status updated to ${status}`,
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update inquiry' });
  }
};

export const deleteInquiry = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteItem('inquiries', id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }
    return res.status(200).json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete inquiry' });
  }
};

