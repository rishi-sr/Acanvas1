import { db } from '../config/db.js';
import { notifyPoemSubmission } from '../services/emailService.js';

export const submitPoem = async (req, res) => {
  try {
    const { poetName, city, email, title, category, poemText, reflection } = req.body;

    const newSubmission = {
      id: `sub-${Date.now()}`,
      poetName,
      city: city || '',
      email: email || '',
      title,
      category: category || 'Life Philosophy',
      poemText,
      reflection: reflection || '',
      submittedAt: new Date().toISOString(),
      status: 'pending',
      approvedPoemId: null
    };

    const saved = await db.addItem('submissions', newSubmission);

    // Trigger automated email dispatch asynchronously
    notifyPoemSubmission(saved).catch(err => {
      console.error('Poem notification dispatch error:', err);
    });

    return res.status(201).json({
      success: true,
      message: 'Your poem has been successfully submitted to Akshar Canvas. An editorial email alert has been dispatched.',
      data: {
        id: saved.id,
        title: saved.title,
        poetName: saved.poetName,
        submittedAt: saved.submittedAt
      }
    });
  } catch (error) {
    console.error('Error submitting poem:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process poem submission.'
    });
  }
};

export const getSubmissions = async (req, res) => {
  try {
    const submissions = await db.getCollection('submissions');
    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not fetch submissions' });
  }
};

export const updateSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const updated = await db.updateItem('submissions', id, { status });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    return res.status(200).json({
      success: true,
      message: `Submission status updated to '${status}'`,
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to update status' });
  }
};

export const approveAndPublishSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await db.getItemById('submissions', id);

    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    const stanzas = submission.poemText.split('\n\n').filter(s => s.trim().length > 0);

    // Create poem in catalog
    const newPoem = {
      id: `poem-${Date.now()}`,
      title: submission.title,
      titleHindi: submission.title,
      poet: submission.poetName,
      poetHindi: submission.poetName,
      book: submission.city ? `Reader Showcase (${submission.city})` : 'Akshar Canvas Reader Stage',
      category: submission.category || 'Life Philosophy',
      featured: false,
      excerpt: stanzas[0] ? stanzas[0].slice(0, 120) + '...' : submission.poemText.slice(0, 120),
      stanzas: stanzas.length > 0 ? stanzas : [submission.poemText],
      originalHindiStanzas: stanzas.length > 0 ? stanzas : [submission.poemText],
      isReaderSubmission: true,
      authorCity: submission.city,
      authorEmail: submission.email,
      likes: 0,
      date: new Date().toISOString().split('T')[0],
      readTime: '2 min'
    };

    const publishedPoem = await db.addItem('poems', newPoem);

    // Update submission
    await db.updateItem('submissions', id, {
      status: 'approved',
      approvedPoemId: publishedPoem.id
    });

    return res.status(200).json({
      success: true,
      message: 'Submission approved and published to poems catalog.',
      data: publishedPoem
    });
  } catch (error) {
    console.error('Error approving submission:', error);
    return res.status(500).json({ success: false, message: 'Failed to approve submission' });
  }
};

export const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.deleteItem('submissions', id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }
    return res.status(200).json({ success: true, message: 'Submission deleted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to delete submission' });
  }
};

