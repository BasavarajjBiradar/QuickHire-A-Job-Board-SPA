const express = require("express");
const router = express.Router();
const Application = require("../models/application");
const mongoose = require("mongoose");

router.post("/applications", async (req, res) => {
  try {
    const { userid, jobid } = req.body;

    if (!userid || !jobid) {
      return res.status(400).json({ error: "User ID and Job ID are required" });
    }

    const user = await mongoose.model("User").findById(userid);
    const job = await mongoose.model("jobpostdb").findById(jobid);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const newApplication = new Application({
      userid,
      jobid,
    });

    await newApplication.save();
    res.status(201).json({
      message: "Application submitted successfully",
      application: newApplication,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "You have already applied for this job" });
    }
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

router.get("/applications/user/:userid", async (req, res) => {
  try {
    const { userid } = req.params;

    const applications = await Application.find({ userid })
      .populate("jobid", "title company")
      .lean();

    if (!applications.length) {
      return res
        .status(404)
        .json({ message: "No applications found for this user" });
    }

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
