const jwt = require('jsonwebtoken'); // Import JSON Web Token

// Middleware to authenticate requests using JWT
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']; // Get the token from the 'Authorization' header

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: "Unauthorized access." });
  }

  // Verify the token using key
  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token." });
    }

    req.user = { username: decoded.username }; // Attach the decoded user information to the request
    next(); // Call the next middleware or route handler
  });
};

module.exports = authMiddleware; // Export middleware
