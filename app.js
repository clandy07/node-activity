const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit'); 
const userRoutes = require('./routes/user');
const loggingMiddleware = require('./middleware/loggingMiddleware');


const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Custom logging middleware to log each request
app.use(loggingMiddleware);

// Rate limiter to limit the number of requests from each IP within a 30-sec window
const limiter = rateLimit({
    windowMs: 30 * 1000, // 30 secs
    max: 5, // Max 5 requests per window per IP
    message: 'Too many requests, please try again later.'
});

// Apply the rate limiter to all requests
app.use(limiter);

// User routes for registration, login, and profile
app.use('/api/users', userRoutes);

// Global error-handling for unexpected errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An unexpected error occurred.' });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});