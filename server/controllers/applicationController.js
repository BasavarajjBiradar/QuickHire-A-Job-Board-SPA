const express = require("express");
const router = express.Router();
const Application = require("../models/application");
const mongoose = require("mongoose");

exports.getApplicantsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ jobid: jobId })
      .populate('userid', 'name email')  // show applicant details
      .lean();

    if (!applications.length) {
      return res.status(404).json({ message: 'No applications found for this job' });
    }

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedApp = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!updatedApp) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json({ success: true, data: updatedApp });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};