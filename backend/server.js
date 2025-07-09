const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies for form data

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate unique filenames
  },
});

const upload = multer({ storage: storage });

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const authMiddleware = require('./middleware/auth');
app.use('/api/posts', authMiddleware, require('./routes/Posts'));
app.use('/api/comments', authMiddleware, require('./routes/Comments'));
app.use('/api/follows', authMiddleware, require('./routes/Follow'));
app.use('/api/notifications', authMiddleware, require('./routes/Notifications'));
app.use('/api/leaderboard', require('./routes/LeaderBoard')); // Leaderboard may be public

const messageRoutes = require('./routes/Messages');
app.use('/api/messages', messageRoutes);

// Register API routes
app.use('/api/users', require('./routes/Users'));
app.use('/api/posts', require('./routes/Posts'));
app.use('/api/comments', require('./routes/Comments'));
app.use('/api/follows', require('./routes/Follow'));
app.use('/api/notifications', require('./routes/Notifications'));
app.use('/api/leaderboard', require('./routes/LeaderBoard'));

// Initialize cron job for leaderboard updates
require('./cron/leaderboardUpdate'); // Runs leaderboard updates on a schedule

// Server configuration
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST === '0.0.0.0' ? '192.168.199.225' : HOST}:${PORT}`);
});