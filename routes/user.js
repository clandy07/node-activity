const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const rateLimit = require('express-rate-limit');

const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 3, 
    message: 'Too many registration or login attempts, please try again later.'
  });


router.post('/register', authLimiter, registerUser);

router.post('/login', authLimiter, loginUser);

router.get('/profile', authMiddleware, getUserProfile);

module.exports = router;