import jwt from 'jsonwebtoken';
import User from '../models/User.js';


// ENVIRONMENT VARIABLES
const JWT_SECRET = process.env.JWT_SECRET || 'your_ultra_secure_secret_key_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '8h';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already registered with this email' });
    }

    // 2. Create user 
    // Pass the plain text password directly! Your User model's .pre('save') hook 
    // will intercept this and hash it safely exactly once. ✅
    const user = await User.create({
      name,
      email,
      password, 
      role: role || 'Editor' 
    });

    // 3. Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user and explicitly select the hidden password field! ✅
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password backend verification.' });
    }

    // 2. Compare passwords using your custom schema instance method
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password backend verification.' });
    }

    // 3. Generate token on success
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};