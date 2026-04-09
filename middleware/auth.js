const { verifyToken } = require('../utils/jwt');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
