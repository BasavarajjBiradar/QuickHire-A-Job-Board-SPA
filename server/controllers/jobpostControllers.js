const Job = require('../models/job');

// Create a new job (POST)
exports.createJob = async (req, res) => {
  try {
    const { title, Company, Location, Description } = req.body;

    // Optional manual validation
    if (!title || !Company || !Location || !Description) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newJob = await Job.create({
      title,
      Company,
      Location,
      Description
      // createdAt is automatically set by schema
    });

    res.status(201).json({ success: true, data: newJob });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all jobs (GET)
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get job by ID (GET /:id)
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, data: job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update job by ID (PUT /:id)
exports.updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.status(200).json({ success: true, data: updatedJob });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete job by ID (DELETE /:id)
exports.deleteJob = async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.status(200).json({ success: true, message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
