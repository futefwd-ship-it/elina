import express from 'express';
import { register, login } from '../controllers/authControllers.js';
import { protect,authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route: POST /api/auth/register
// router.post('/register', register);
// Add your protection middlewares to lock the door!
router.post('/register', protect, authorizeRoles('Admin'), register);

// Route: POST /api/auth/login
router.post('/login', login);

export default router;