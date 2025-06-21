const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../models/User");
const { signupUser, loginUser } = require("../controllers/authController");

// Signup & Login Routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ success: false, error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded contains { id, roles, iat, exp }
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Unauthorized access" });
  }
};

// Protected route to get logged-in user data
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles, // <-- Include roles
      },
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});


router.get('/recruiter/:recruiterId', async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const jobs = await Job.find({ postedBy: recruiterId })
      .populate('postedBy', 'name email roles') // optional, shows recruiter info
      .sort({ createdAt: -1 });

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found for this recruiter' });
    }

    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    console.error('Error fetching recruiter jobs:', error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
