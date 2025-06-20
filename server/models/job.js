// models/jobs.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job Title is required'],
  },
  Company: {
    type: String,
    required: [true, 'Company Name is required'],
  },
  Location: {
    type: String,
    required: [true, 'Job Location is required'],
  },
  Description: {
    type: String,
    required: [true, 'Job Description is required'],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'jobpostdb'
});

module.exports = mongoose.model('Job', jobSchema);  // use 'Job' as model name (not collection name)
