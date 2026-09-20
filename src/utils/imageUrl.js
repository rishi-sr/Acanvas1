/**
 * Resolves an image URL to a full valid URL.
 * Handles Cloudinary URLs, local uploaded relative paths (/uploads/...), 
 * asset paths, and fallback defaults.
 */
export const resolveImageUrl = (url, fallback = '') => {
  if (!url || typeof url !== 'string') return fallback;
  const trimmed = url.trim();
  if (!trimmed) return fallback;

  // If already absolute URL (Cloudinary, https, http, base64 data, or blob)
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // If it's a relative /uploads/... path from the backend
  if (trimmed.startsWith('/uploads/')) {
    const backendHost = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '')
      : (typeof window !== 'undefined' && (window.location.port === '5173' || window.location.port === '5174')
          ? 'http://localhost:5002'
          : '');
    return backendHost ? `${backendHost}${trimmed}` : trimmed;
  }

  return trimmed;
};

