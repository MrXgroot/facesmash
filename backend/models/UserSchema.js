const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-zA-Z0-9._]+$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  fullName: {
    type: String,
    trim: true,
    maxlength: 50
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 150
  },
  profilePicture: {
    url: {
      type: String,
      trim: true
    },
    publicId: {
      type: String,
      trim: true
    }
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  postCount: {
    type: Number,
    default: 0,
    min: 0
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Follow'
  }],
  followerCount: {
    type: Number,
    default: 0,
    min: 0
  },
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Follow'
  }],
  followingCount: {
    type: Number,
    default: 0,
    min: 0
  },
  leaderboardEntries: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Leaderboard'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
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

// Indexes for performance
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

// Pre-save middleware to hash password and update counts
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.postCount = this.posts.length;
  this.followerCount = this.followers.length;
  this.followingCount = this.following.length;
  this.updatedAt = Date.now();
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;