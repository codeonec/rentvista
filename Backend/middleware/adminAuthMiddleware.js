const jwt = require('jsonwebtoken');

const requireAdminAuth = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'urbannestjwtadmin');

    // Check if the decoded token contains admin credentials
    if (decoded.username !== 'admin') {
      return res.status(403).json({ error: 'Forbidden - Not an admin user' });
    }

    // Pass admin user to the next middleware or route handler
    req.adminUser = decoded;
    next();
  } catch (error) {
    console.error('Error during admin authentication:', error);
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

module.exports = requireAdminAuth;
