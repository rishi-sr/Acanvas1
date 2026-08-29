import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load Environment Variables
dotenv.config();

// Route Imports
import authRoutes from './routes/authRoutes.js';
import authorRoutes from './routes/authorRoutes.js';
import poemRoutes from './routes/poemRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import quoteRoutes from './routes/quoteRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Middleware
import { globalLimiter } from './middleware/rateLimiter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Security Headers with Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false
  })
);

// CORS Configuration
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5174,http://localhost:5173,http://localhost:3000')
  .split(',')
  .map(origin => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || NODE_ENV === 'development') {
        return callback(null, true);
      }
      return callback(new Error('Blocked by CORS policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body Parsing Middleware with size limits
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Logging
if (NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Global API Rate Limiter
app.use('/api', globalLimiter);

// Serve Static Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/poems', poemRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/contact', inquiryRoutes);
app.use('/api/admin', adminRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    system: 'Akshar Canvas Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    env: NODE_ENV
  });
});

// 404 Handler for API
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`
  });
});

// Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('Server error encountered:', err);

  if (err.name === 'MulterError') {
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`
    });
  }

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n=================================================`);
  console.log(`✨ Akshar Canvas Backend Server running on port ${PORT}`);
  console.log(`🛡️  Security stack, Rate Limiting & Bot Traps active`);
  console.log(`📬 Email notification dispatcher ready`);
  console.log(`🌐 Health endpoint: http://localhost:${PORT}/api/health`);
  console.log(`=================================================\n`);
});

export default app;

