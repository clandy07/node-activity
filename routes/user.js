const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const rateLimit = require('express-rate-limit');

const router = express.Router(); // Create a new router instance

// Set up rate limiter for registration and login routes
const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,  // Limit each IP to 3 requests per minute
  max: 10,
  message: 'Too many registration or login attempts, please try again later.'
});


// Define routes for user-related actions
router.post('/register', authLimiter, registerUser); // Route for user registration with rate limiting

router.post('/login', authLimiter, loginUser); // Route for user login with rate limiting

router.get('/profile', authMiddleware, getUserProfile); // Route for fetching user profile, protected by auth middleware

module.exports = router; // Export the router 