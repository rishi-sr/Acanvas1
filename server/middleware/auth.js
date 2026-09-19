import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'akshar_canvas_super_secret_jwt_key_2026_xyz';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;

  if (!token || token === 'null' || token === 'undefined') {
    return res.status(401).json({
      success: false,
      code: 'NO_TOKEN',
      message: 'Access Denied: No authentication token provided. Please log in.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      code: 'INVALID_OR_EXPIRED_TOKEN',
      message: 'Access Denied: Your session has expired or is invalid. Please log in again.'
    });
  }
};

export const requireAdmin = (req, res, next) => {
  if (!req.user || (req.user.role !== 'admin' && req.user.role !== 'administrator')) {
    return res.status(403).json({
      success: false,
      code: 'FORBIDDEN',
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

