const express = require('express');
const router = express.Router();
const Notification = require('../models/notificationSchema');
const authMiddleware = require('../middleware/auth');

// Get notifications for a user (protected)
router.get('/:userId', authMiddleware, async (req, res) => {
  try {
    if (req.params.userId !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized access to notifications' });
    }
    const notifications = await Notification.find({ recipient: req.params.userId })
      .populate('sender', 'username')
      .populate('post')
      .populate('comment')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark notification as read
router.put('/:notificationId/read', authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.notificationId);
    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    if (notification.recipient.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    notification.isRead = true;
    await notification.save();
    res.json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;