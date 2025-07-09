const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  period: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'allTime'],
    required: true,
    index: true
  },
  category: {
    type: String,
    enum: ['all', 'fashion', 'fitness', 'lifestyle', 'art', 'other'],
    default: 'all',
    index: true
  },
  engagementScore: {
    type: Number,
    default: 0,
    min: 0
  },
  likeCount: {
    type: Number,
    default: 0,
    min: 0
  },
  commentCount: {
    type: Number,
    default: 0,
    min: 0
  },
  commentRatingSum: {
    type: Number,
    default: 0,
    min: 0
  },
  averageCommentRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  trendingBonus: {
    type: Number,
    default: 0,
    min: 0
  },
  consistencyBonus: {
    type: Number,
    default: 0,
    min: 0
  },
  rank: {
    type: Number,
    default: 0,
    min: 0
  },
  status: {
    type: String,
    enum: ['none', 'hot', 'superHot', 'ultraHot'],
    default: 'none'
  },
  lastPostTimestamp: {
    type: Date,
    default: null
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compound index for efficient leaderboard queries
leaderboardSchema.index({ period: 1, category: 1, engagementScore: -1, updatedAt: -1 });

// Pre-save middleware to calculate engagement score and status
leaderboardSchema.pre('save', function(next) {
  // Calculate average comment rating
  this.averageCommentRating = this.commentCount > 0 
    ? this.commentRatingSum / this.commentCount 
    : 0;

  // Calculate engagement score
  const likeWeight = 1;
  const commentWeight = 2;
  const ratingWeight = 3;
  this.engagementScore = 
    (this.likeCount * likeWeight) +
    (this.commentCount * commentWeight) +
    (this.averageCommentRating * ratingWeight) +
    this.trendingBonus +
    this.consistencyBonus;

  // Assign status based on rank
  if (this.rank >= 1 && this.rank <= 10) {
    this.status = 'ultraHot';
  } else if (this.rank >= 11 && this.rank <= 50) {
    this.status = 'superHot';
  } else if (this.rank >= 51 && this.rank <= 100) {
    this.status = 'hot';
  } else {
    this.status = 'none';
  }

  this.updatedAt = Date.now();
  next();
});

// Method to update trending bonus
leaderboardSchema.methods.updateTrendingBonus = function(postLikes, timeSincePost) {
  const hoursSincePost = (Date.now() - timeSincePost) / (1000 * 60 * 60);
  if (hoursSincePost <= 1 && postLikes >= 100) {
    this.trendingBonus += postLikes * 0.5;
  } else if (this.trendingBonus > 0) {
    this.trendingBonus = Math.max(0, this.trendingBonus - 1);
  }
};

// Method to update consistency bonus
leaderboardSchema.methods.updateConsistencyBonus = function(postTimestamps) {
  const recentPosts = postTimestamps.filter(
    ts => (Date.now() - ts) / (1000 * 60 * 60 * 24) <= 7
  );
  this.consistencyBonus = recentPosts.length * 10;
};

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;