import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after a moment.'
  }
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. For security reasons, please wait a few moments before trying again.'
  }
});

export const authSpeedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 10,
  delayMs: (hits) => (hits - 10) * 300
});

export const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Submission limit reached for your connection. Please wait a few moments before submitting again.'
  }
});

export const likeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Like rate limit reached. Please slow down.'
  }
});

