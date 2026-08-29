import { db } from '../config/db.js';
import { getEmailJsConfig, notifyContactInquiry } from '../services/emailService.js';

export const exportDatabase = async (req, res) => {
  try {
    const fullData = await db.exportFullDb();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=akshar_canvas_backup_${new Date().toISOString().slice(0, 10)}.json`);
    return res.status(200).send(JSON.stringify(fullData, null, 2));
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Export failed' });
  }
};

export const importDatabase = async (req, res) => {
  try {
    const backupData = req.body;
    const restored = await db.importFullDb(backupData);
    return res.status(200).json({
      success: true,
      message: 'Database successfully restored from backup',
      data: restored
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message || 'Import failed' });
  }
};

export const resetDatabase = async (req, res) => {
  try {
    const defaultData = await db.resetDb();
    return res.status(200).json({
      success: true,
      message: 'Database reset to default seed records',
      data: defaultData
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Reset failed' });
  }
};

export const getSystemStatus = async (req, res) => {
  try {
    const authors = await db.getAuthors();
    const poems = await db.getCollection('poems');
    const quotes = await db.getCollection('quotes');
    const books = await db.getCollection('books');
    const submissions = await db.getCollection('submissions');
    const inquiries = await db.getCollection('inquiries');

    const emailConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
    const mongoConfigured = !!process.env.MONGODB_URI;
    const cloudinaryConfigured = !!(process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET);

    return res.status(200).json({
      success: true,
      status: 'operational',
      timestamp: new Date().toISOString(),
      database: {
        engine: db.isMongoActive() ? 'MongoDB (Cloud Mongoose)' : 'Local Transactional JSON Database',
        connected: true
      },
      cloudinary: {
        status: cloudinaryConfigured ? 'active' : 'local_storage_fallback'
      },
      emailService: {
        mode: emailConfigured ? 'live_smtp' : 'simulated_logger',
        host: process.env.SMTP_HOST || 'Not Configured (Console Log Fallback)',
        adminTarget: process.env.ADMIN_NOTIFICATION_EMAIL || 'admin@aksharcanvas.com'
      },
      security: {
        jwtEnabled: true,
        rateLimiting: 'active',
        botHoneypot: 'active',
        xssSanitization: 'active',
        idorProtection: 'active'
      },
      stats: {
        authorsCount: Object.keys(authors || {}).filter(k => k !== 'synergy').length,
        poemsCount: poems.length,
        quotesCount: quotes.length,
        booksCount: books.length,
        submissionsCount: submissions.length,
        inquiriesCount: inquiries.length
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not fetch status' });
  }
};

export const testEmailService = async (req, res) => {
  try {
    const { isConfigured, service_id, template_id, user_id, accessToken } = getEmailJsConfig();
    const smtpConfigured = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
    const targetEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'aksharcanvas@gmail.com';

    const testInquiry = {
      id: `diag-${Date.now()}`,
      name: 'Email Diagnostic Tester',
      email: 'aksharcanvas@gmail.com',
      phone: '+91 99999 00000',
      city: 'Live Test',
      eventType: 'Diagnostics',
      date: new Date().toISOString().slice(0, 10),
      message: 'This is a live test inquiry from Akshar Canvas server diagnostic tool to verify Gmail and EmailJS delivery.'
    };

    console.log('🧪 [TEST EMAIL] Running email diagnostic test...');
    const result = await notifyContactInquiry(testInquiry);

    return res.status(200).json({
      success: result.success && !result.simulated,
      serviceUsed: result.simulated ? 'none (simulated logger)' : result.service,
      targetRecipient: targetEmail,
      environmentCheck: {
        emailjs: {
          configured: isConfigured,
          serviceIdFound: !!service_id,
          templateIdFound: !!template_id,
          publicKeyFound: !!user_id,
          hasPrivateKey: !!accessToken
        },
        smtp: {
          configured: smtpConfigured,
          host: process.env.SMTP_HOST || null,
          user: process.env.SMTP_USER || null
        }
      },
      dispatchResult: result
    });
  } catch (error) {
    console.error('❌ [TEST EMAIL ERROR]:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
};

