const express = require('express');
const router = express.Router();
const Follow = require('../models/followSchema');
const User = require('../models/userSchema');
const Notification = require('../models/notificationSchema');
const authMiddleware = require('../middleware/auth');

// Create a follow request (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { followingId } = req.body;
    const followerId = req.user.id;
    if (!followingId) {
      return res.status(400).json({ error: 'Following ID is required' });
    }
    if (followerId === followingId) {
      return res.status(400).json({ error: 'Cannot follow yourself' });
    }
    const existingFollow = await Follow.findOne({ follower: followerId, following: followingId });
    if (existingFollow) {
      return res.status(400).json({ error: 'Follow request already exists' });
    }
    const user = await User.findById(followingId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const status = user.isPrivate ? 'pending' : 'accepted';
    const follow = new Follow({ follower: followerId, following: followingId, status });
    await follow.save();
    if (status === 'accepted') {
      await User.findByIdAndUpdate(followerId, { $push: { following: follow._id }, $inc: { followingCount: 1 } });
      await User.findByIdAndUpdate(followingId, { $push: { followers: follow._id }, $inc: { followerCount: 1 } });
      const notification = new Notification({
        recipient: followingId,
        sender: followerId,
        type: 'follow'
      });
      await notification.save();
    }
    res.status(201).json({ message: 'Follow request created', follow });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Approve a follow request (protected)
router.put('/approve/:followId', authMiddleware, async (req, res) => {
  try {
    const follow = await Follow.findById(req.params.followId);
    if (!follow) {
      return res.status(404).json({ error: 'Follow request not found' });
    }
    if (follow.following.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    if (follow.status === 'pending') {
      follow.status = 'accepted';
      await follow.save();
      await User.findByIdAndUpdate(follow.following, { $push: { followers: follow._id }, $inc: { followerCount: 1 } });
      await User.findByIdAndUpdate(follow.follower, { $push: { following: follow._id }, $inc: { followingCount: 1 } });
      const notification = new Notification({
        recipient: follow.follower,
        sender: req.user.id,
        type: 'follow'
      });
      await notification.save();
    }
    res.json({ message: 'Follow request approved', follow });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;