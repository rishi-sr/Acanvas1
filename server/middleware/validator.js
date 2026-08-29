import { body, param, query, validationResult } from 'express-validator';

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*(["']).*?\1/gi, '')
    .replace(/javascript\s*:/gi, '')
    .trim();
};

export const sanitizeBody = (req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    const sanitizeRecursive = (obj) => {
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'string') {
          obj[key] = sanitizeString(obj[key]);
        } else if (Array.isArray(obj[key])) {
          obj[key] = obj[key].map(item => (typeof item === 'string' ? sanitizeString(item) : item));
        } else if (obj[key] !== null && typeof obj[key] === 'object') {
          sanitizeRecursive(obj[key]);
        }
      }
    };
    sanitizeRecursive(req.body);
  }
  next();
};

export const botHoneypotTrap = (req, res, next) => {
  const honeypot = req.body.website_url_hp || req.body.author_ref_hp || req.body.bot_token_hp;
  if (honeypot && String(honeypot).trim().length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Automated bot activity detected and rejected.'
    });
  }
  next();
};

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please verify your input.',
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg
      }))
    });
  }
  next();
};

export const loginValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 50 }).withMessage('Username must be 3-50 characters'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6, max: 100 }).withMessage('Password must be at least 6 characters')
];

export const submitPoemValidation = [
  body('poetName')
    .trim()
    .notEmpty().withMessage('Poet name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Poet name must be 2-100 characters'),
  body('title')
    .trim()
    .notEmpty().withMessage('Poem title is required')
    .isLength({ min: 2, max: 150 }).withMessage('Title must be 2-150 characters'),
  body('poemText')
    .trim()
    .notEmpty().withMessage('Poem verses are required')
    .isLength({ min: 10, max: 10000 }).withMessage('Poem text must be between 10 and 10,000 characters'),
  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail().withMessage('Please provide a valid email address'),
  body('city')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('City must be under 100 characters'),
  body('category')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }),
  body('reflection')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage('Reflection note must be under 1000 characters')
];

export const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email address is required')
    .isEmail().withMessage('Please enter a valid email address'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Contact phone number is required')
    .isLength({ min: 7, max: 25 }).withMessage('Phone number must be valid (7-25 digits)'),
  body('city')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }),
  body('eventType')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }),
  body('date')
    .optional({ checkFalsy: true })
    .trim(),
  body('message')
    .trim()
    .notEmpty().withMessage('Inquiry message is required')
    .isLength({ min: 5, max: 5000 }).withMessage('Message must be between 5 and 5,000 characters')
];

export const poemCrudValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Poem title is required')
    .isLength({ min: 2, max: 200 }),
  body('poet')
    .trim()
    .notEmpty().withMessage('Author name is required'),
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required'),
  body('stanzas')
    .custom((val) => {
      if (Array.isArray(val) && val.length > 0) return true;
      if (typeof val === 'string' && val.trim().length > 0) return true;
      throw new Error('At least one stanza is required');
    })
];

export const authorUpdateValidation = [
  param('id')
    .trim()
    .notEmpty().withMessage('Author ID is required')
    .isAlpha('en-US', { ignore: '-_' }).withMessage('Invalid author ID format'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }),
  body('nameHindi')
    .optional()
    .trim(),
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 }),
  body('signatureQuote')
    .optional()
    .trim()
    .isLength({ max: 500 }),
  body('shortBio')
    .optional()
    .trim()
    .isLength({ max: 1000 }),
  body('philosophy')
    .optional()
    .trim()
    .isLength({ max: 1000 })
];

export const quoteCrudValidation = [
  body('quote')
    .trim()
    .notEmpty().withMessage('Quote text is required')
    .isLength({ min: 5, max: 2000 }),
  body('author')
    .trim()
    .notEmpty().withMessage('Author name is required')
    .isLength({ min: 2, max: 100 })
];

export const bookCrudValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Book title is required')
    .isLength({ min: 2, max: 200 }),
  body('author')
    .trim()
    .notEmpty().withMessage('Author name is required')
];

