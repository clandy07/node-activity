// Middleware to log incoming requests
const loggingMiddleware = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`); // Log the current timestamp, HTTP method, and the request path
    next(); // Call the next middleware or route handler
  };
  
  module.exports = loggingMiddleware; // Export the logging middleware 