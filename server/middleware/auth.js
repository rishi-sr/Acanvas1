import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'akshar_canvas_super_secret_jwt_key_2026_xyz';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: No authentication token provided.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Invalid or expired authentication token.'
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access Denied: Administrator privileges required.'
    });
  }
  next();
};

export const requireOwnershipOrAdmin = (getResourceOwnerId) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    if (req.user.role === 'admin') {
      return next();
    }

    const ownerId = typeof getResourceOwnerId === 'function' ? getResourceOwnerId(req) : null;
    if (ownerId && String(req.user.id) === String(ownerId)) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: 'Forbidden: You do not possess ownership authorization for this resource.'
    });
  };
};

