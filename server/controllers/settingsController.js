import { db } from '../config/db.js';

/**
 * Get public site settings & homepage content
 */
export const getSettings = async (req, res) => {
  try {
    const settings = await db.getSiteSettings();
    return res.status(200).json({
      success: true,
      data: settings
    });
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return res.status(500).json({
      success: false,
      message: 'Could not retrieve site settings'
    });
  }
};

/**
 * Update site settings (Admin Protected)
 */
export const updateSettings = async (req, res) => {
  try {
    const updates = req.body;
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid settings payload'
      });
    }

    const updatedSettings = await db.updateSiteSettings(updates);
    return res.status(200).json({
      success: true,
      message: 'Website settings updated successfully',
      data: updatedSettings
    });
  } catch (error) {
    console.error('Error updating site settings:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update site settings'
    });
  }
};
