import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_ultra_secure_secret_key_2026';

// Middleware to verify if the user is authenticated at all via JWT
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from format: "Bearer <token_string>"
      token = req.headers.authorization.split(' ')[1];

      // Decode token payload
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach user information to the request object for down-stream routes to access
      req.user = decoded; 
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token verification failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

// Middleware to restrict routes to specific roles (e.g., Only Admin can Delete)
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Role (${req.user?.role || 'Guest'}) is not allowed to access this resource.` 
      });
    }
    next();
  };
};