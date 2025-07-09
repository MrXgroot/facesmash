const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName, bio } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already registered' });
    }
    const user = new User({ username, email, password, fullName, bio });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User created', token, user: { id: user._id, username, email, fullName } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login user with JWT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    if (!user || !await user.comparePassword(password)) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token, user: { id: user._id, username: user.username, email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile (protected)
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('posts')
      .populate('followers', 'follower')
      .populate('following', 'following');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;