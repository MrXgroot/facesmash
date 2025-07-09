const express = require('express');
const router = express.Router();
const Comment = require('../models/commentSchema');
const Post = require('../models/postSchema');
const Notification = require('../models/notificationSchema');
const authMiddleware = require('../middleware/auth');

// Create a comment (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { postId, content, rating } = req.body;
    if (!postId || !content || !rating) {
      return res.status(400).json({ error: 'Post ID, content, and rating are required' });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    const comment = new Comment({ post: postId, user: req.user.id, content, rating });
    await comment.save();
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
    // Create notification if commenter is not the post owner
    if (post.user.toString() !== req.user.id) {
      const notification = new Notification({
        recipient: post.user,
        sender: req.user.id,
        type: 'comment',
        post: postId,
        comment: comment._id
      });
      await notification.save();
    }
    res.status(201).json({ message: 'Comment created', comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Like a comment (protected)
router.post('/like/:commentId', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (!comment.likes.includes(req.user.id)) {
      comment.likes.push(req.user.id);
      await comment.save();
      if (comment.user.toString() !== req.user.id) {
        const notification = new Notification({
          recipient: comment.user,
          sender: req.user.id,
          type: 'like',
          comment: comment._id,
          post: comment.post
        });
        await notification.save();
      }
    }
    res.json({ message: 'Comment liked', comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;