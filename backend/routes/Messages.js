const express = require('express');
const router = express.Router();
const Message = require('../models/messageSchema');
const authMiddleware = require('../middleware/auth');

// Send a message
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const message = new Message({
      sender: req.user.id,
      recipient: recipientId,
      content,
    });
    await message.save();
    res.json({ message: 'Message sent', data: message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get messages between two users
router.get('/:recipientId', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user.id, recipient: req.params.recipientId },
        { sender: req.params.recipientId, recipient: req.user.id },
      ],
    }).sort('createdAt').populate('sender', 'username');
    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;