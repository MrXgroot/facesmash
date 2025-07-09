const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema');
const User = require('../models/userSchema');
const Notification = require('../models/notificationSchema');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Upload route for creating a post with images (protected)
router.post('/upload', authMiddleware, upload.array('images', 5), async (req, res) => {
  try {
    const { caption, category } = req.body;
    const imageFiles = req.files;
    if (!imageFiles || imageFiles.length === 0) {
      return res.status(400).json({ error: 'At least one image is required' });
    }
    const images = imageFiles.map(file => ({
      url: `/uploads/${file.filename}`,
      filePath: file.path,
      publicId: file.filename,
      width: 0,
      height: 0
    }));
    const post = new Post({ user: req.user.id, caption, images, category });
    await post.save();
    await User.findByIdAndUpdate(req.user.id, { $push: { posts: post._id }, $inc: { postCount: 1 } });
    res.status(201).json({ message: 'Post created with images', post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get posts by user
router.get('/user/:userId', async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId })
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like a post (protected)
router.post('/like/:postId', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (!post.likes.includes(req.user.id)) {
      post.likes.push(req.user.id);
      await post.save();
      if (post.user.toString() !== req.user.id) {
        const notification = new Notification({
          recipient: post.user,
          sender: req.user.id,
          type: 'like',
          post: post._id
        });
        await notification.save();
      }
    }
    res.json({ message: 'Post liked', post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;