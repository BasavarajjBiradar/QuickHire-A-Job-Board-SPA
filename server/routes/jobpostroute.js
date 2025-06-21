// jobpostroute.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobpostControllers');
const protect = require('../middlewares/authMiddleware');


// Route paths WITHOUT /jobs
// routes/jobpostroute.js
router.post('/', protect, jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);// GET jobs by recruiter ID
router.get('/recruiter/:recruiterId', jobController.getJobsByRecruiter);


module.exports = router;
