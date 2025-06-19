const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/authController');

router.post('/signup', signupUser);   //localhost:5000/api/auth/signup
router.post('/login', loginUser);      //localhost:5000/api/auth/login
 
module.exports = router;
