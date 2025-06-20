const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoute');
const jobRoutes = require('./routes/jobpostroute');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to QuickHire API!');
});

module.exports = app;
