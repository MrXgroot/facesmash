const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/LeaderBoardSchema');

// Get leaderboard (public)
router.get('/', async (req, res) => {
  try {
    const { period = 'weekly', category = 'all' } = req.query;

    // Validate period and category
    if (!['daily', 'weekly', 'monthly', 'allTime'].includes(period)) {
      return res.status(400).json({ error: 'Invalid period value' });
    }
    if (!['all', 'fashion', 'fitness', 'lifestyle', 'art', 'other'].includes(category)) {
      return res.status(400).json({ error: 'Invalid category value' });
    }

    const leaderboard = await Leaderboard.find({ period, category })
      .populate('user', 'username')
      .sort({ engagementScore: -1, updatedAt: -1 })
      .limit(100);

    // Assign ranks based on sorted order
    leaderboard.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    // Save updated ranks
    await Promise.all(leaderboard.map(entry => entry.save()));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;