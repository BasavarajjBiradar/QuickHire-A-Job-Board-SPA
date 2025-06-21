const express = require("express");
const router = express.Router();
const Application = require("../models/application");
const mongoose = require("mongoose");
const Job=require('../models/job');
const User = require("../models/User");
// const applicationController = require('../controllers/applicationController');



router.post("/applications", async (req, res) => {
  try {
    const { userid, jobid } = req.body;

    if (!userid || !jobid) {
      return res.status(400).json({ error: "User ID and Job ID are required" });
    }

    const user = await mongoose.model("User").findById(userid);
const job = await mongoose.model("Job").findById(jobid);
console.log(user, job)

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
      .populate({
        path: "jobid",
        model: "Job",
        select: "-__v", 
      })
      .populate({
        path: "userid",
        model: "User",
        select: "name email roles", 
      })
      .lean();

    if (!applications.length) {
      return res.status(404).json({ message: "No applications found for this user" });
    }

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Get applications for jobs posted by a specific recruiter
router.get("/applications/recruiter/:recruiterId", async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const jobsByRecruiter = await Job.find({ postedBy: recruiterId }).select('_id');
    const jobIds = jobsByRecruiter.map((job) => job._id);

    const applications = await Application.find({ jobid: { $in: jobIds } })
      .populate('jobid', 'title Company Description')
      .populate('userid', 'name email');

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching recruiter applications:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
});


// GET application by ID for recruiter to view
router.get("/applications/:applicationId/recruiter/:recruiterId", async (req, res) => {
  try {
    const { applicationId, recruiterId } = req.params;

    const application = await Application.findById(applicationId)
      .populate('jobid', 'title Company Description postedBy')
      .populate('userid', 'name email roles');

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Check if the job was posted by the recruiter
    if (application.jobid.postedBy.toString() !== recruiterId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});


// PATCH application status by recruiter
router.patch("/applications/:applicationId/status", async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, recruiterId } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const application = await Application.findById(applicationId).populate('jobid');

    if (!application) {
      return res.status(404).json({ error: "Application not found" });
    }

    // Validate recruiter is the owner of the job
    if (application.jobid.postedBy.toString() !== recruiterId) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ success: true, message: "Application status updated", data: application });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});



module.exports = router;


