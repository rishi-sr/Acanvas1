import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const isCloudinaryConfigured = () => {
  const cloud_name = (process.env.CLOUDINARY_CLOUD_NAME || '').trim();
  const api_key = (process.env.CLOUDINARY_API_KEY || '').trim();
  const api_secret = (process.env.CLOUDINARY_API_SECRET || '').trim();
  return !!(cloud_name && api_key && api_secret);
};

export const getCloudinary = () => {
  if (isCloudinaryConfigured()) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
      api_key: process.env.CLOUDINARY_API_KEY.trim(),
      api_secret: process.env.CLOUDINARY_API_SECRET.trim()
    });
    return cloudinary;
  }
  return null;
};

/**
 * Uploads a local file to Cloudinary (or returns local fallback URL)
 */
export const uploadImageToCloud = async (file, folder = 'akshar_canvas') => {
  if (!file) return null;

  const cld = getCloudinary();
  if (cld) {
    try {
      console.log(`☁️ [CLOUDINARY] Uploading ${file.originalname || file.filename} to folder '${folder}'...`);
      const result = await cld.uploader.upload(file.path, {
        folder: folder,
        resource_type: 'image'
      });

      // Remove temp local file after cloud upload
      if (fs.existsSync(file.path)) {
        try { fs.unlinkSync(file.path); } catch {}
      }

      console.log('✅ [CLOUDINARY SUCCESS] Image uploaded:', result.secure_url);
      return result.secure_url;
    } catch (error) {
      console.error('❌ [CLOUDINARY ERROR]:', error.message || error);
      // Fallback to local path if Cloudinary fails
      return `/uploads/${file.filename}`;
    }
  }

  // Fallback to local server upload directory
  console.log(`📁 [LOCAL UPLOAD] Stored locally: /uploads/${file.filename}`);
  return `/uploads/${file.filename}`;
};

