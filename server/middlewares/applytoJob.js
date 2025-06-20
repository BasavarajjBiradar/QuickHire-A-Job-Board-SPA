const Application = require('../models/applicationModel'); // adjust the path as needed

const applyToJob = async (req, res) => {
  const { jobid } = req.body;

  try {
    const userid = req.user._id; // <-- taken from your middleware

    if (!jobid || !userid) {
      return res.status(400).json({ success: false, message: 'Job ID and User ID are required' });
    }

    const application = new Application({ userid, jobid });

    await application.save();

    res.status(201).json({ success: true, message: 'Application submitted!', data: application });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'You have already applied for this job' });
    }

    console.error('Application Error:', error);
    res.status(500).json({ success: false, message: 'Server error while applying' });
  }
};

module.exports = {
  applyToJob
};
