const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Post = require("./models/PostSchema");
const app = express();
const PORT = 5000;

// ✅ MongoDB Connection URI (replace with your real one)
const MONGO_URI = "mongodb://127.0.0.1:27017/facesmash"; // for local MongoDB
// const MONGO_URI = "your-atlas-uri"; // if using MongoDB Atlas

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Sample route
app.get("/", async (req, res) => {
  try {
    const postdata = await Post.find({});
    console.log(postdata);
    return res.status(200).json({ data: postdata });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running at http://0.0.0.0:${PORT}`);
  console.log(`🌐 Access it on your IP, e.g., http://192.168.199.88:${PORT}`);
});
