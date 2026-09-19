import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Environment Variables
dotenv.config({ path: path.join(__dirname, '.env') });
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
import galleryRoutes from './routes/galleryRoutes.js';
import workshopRoutes from './routes/workshopRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import samkalieenRoutes from './routes/samkalieenRoutes.js';

// Middleware
import { globalLimiter } from './middleware/rateLimiter.js';

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Trust reverse proxy (Render, Vercel, Heroku, Cloudflare)
app.set('trust proxy', 1);

// Security Headers with Helmet
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false
  })
);

// CORS Configuration
const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      
      // In development, or if in explicit allowed list, or localhost/vercel/render/netlify
      if (
        allowedOrigins.length === 0 ||
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin) ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1') ||
        origin.includes('aksharcanvas') ||
        origin.endsWith('.vercel.app') ||
        origin.endsWith('.onrender.com') ||
        origin.endsWith('.netlify.app')
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive fallback for all client endpoints
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
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
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/samkalieen', samkalieenRoutes);

// Root Welcome / Ping
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    system: 'Akshar Canvas Backend API',
    health: '/api/health',
    version: '1.0.0'
  });
});

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

