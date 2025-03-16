const jwt = require('jsonwebtoken');


// Middleware to verify token and check if user is an admin
module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]?.trim();

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admin only' });
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    console.error('JWT Verification Error:', err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
