const cron = require('node-cron');
const Post = require('../models/postSchema');
const Leaderboard = require('../models/LeaderBoardSchema');
const User = require('../models/userSchema');

cron.schedule('0 0 * * *', async () => { // Runs daily at midnight IST
  console.log('Updating leaderboard...');
  try {
    const users = await User.find();
    const periods = ['daily', 'weekly', 'monthly', 'allTime'];
    const categories = ['all', 'fashion', 'fitness', 'lifestyle', 'art', 'other'];

    for (const user of users) {
      const posts = await Post.find({ user: user._id });
      const postTimestamps = posts.map(p => p.createdAt);

      for (const period of periods) {
        for (const category of categories) {
          const likeCount = posts.reduce((sum, p) => sum + p.likes.length, 0);
          const commentCount = posts.reduce((sum, p) => sum + (p.comments ? p.comments.length : 0), 0);
          const commentRatingSum = 0; // Placeholder; requires Comment model

          let leaderboardEntry = await Leaderboard.findOne({ user: user._id, period, category });
          if (!leaderboardEntry) {
            leaderboardEntry = new Leaderboard({ user: user._id, period, category });
          }

          leaderboardEntry.likeCount = likeCount;
          leaderboardEntry.commentCount = commentCount;
          leaderboardEntry.commentRatingSum = commentRatingSum;
          leaderboardEntry.lastPostTimestamp = posts.length ? posts[0].createdAt : null;

          leaderboardEntry.updateTrendingBonus(likeCount, posts.length ? posts[0].createdAt : Date.now());
          leaderboardEntry.updateConsistencyBonus(postTimestamps);

          await leaderboardEntry.save();
        }
      }
    }

    // Re-rank after updates
    for (const period of periods) {
      for (const category of categories) {
        const leaderboard = await Leaderboard.find({ period, category })
          .sort({ engagementScore: -1, updatedAt: -1 });
        leaderboard.forEach((entry, index) => {
          entry.rank = index + 1;
        });
        await Promise.all(leaderboard.map(entry => entry.save()));
      }
    }
  } catch (error) {
    console.error('Leaderboard update error:', error);
  }
});

module.exports = cron;