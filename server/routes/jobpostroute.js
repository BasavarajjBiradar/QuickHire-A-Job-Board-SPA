const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobpostControllers');
const protect = require('../middlewares/authMiddleware');


router.post('/', protect, jobController.createJob);
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);
router.get('/recruiter/:recruiterId', jobController.getJobsByRecruiter);  // get by  recruiter ID


module.exports = router;
