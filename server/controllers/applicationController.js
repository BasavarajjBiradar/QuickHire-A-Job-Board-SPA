const Application = require('../models/application');
const User = require('../models/User');
const Job = require('../models/job');

exports.getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('userid', 'name email') // fetch name and email from user
      .populate('jobid', 'title Company Location'); // fetch job details

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get application by ID
// @route   GET /api/applications/:id
exports.getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('userid', 'name email')
      .populate('jobid', 'title Company Location Description');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Apply for a job
// @route   POST /api/applications
exports.applyJob = async (req, res) => {
  try {
    const { userid, jobid } = req.body;

    const newApplication = new Application({
      userid,
      jobid,
    });

    await newApplication.save();

    res.status(201).json({ success: true, data: newApplication });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Already applied for this job.' });
    }

    res.status(500).json({ success: false, message: error.message });
  }
};
