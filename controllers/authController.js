const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.create(name, email, hashedPassword, 'user');

    const token = generateToken(userId, 'user');
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: userId, name, email, role: 'user' }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id, user.role);
    res.json({ 
      message: 'Login successful', 
      token, 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
