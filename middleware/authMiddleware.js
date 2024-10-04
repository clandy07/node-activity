const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
  
  
    if (token !== 'sample-token') {
      return res.status(401).json({ message: "Unauthorized access." });
    }
  
    req.user = { username: 'testUser' }; 
    next();
  };
  
  module.exports = authMiddleware;