const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' }); 

const authRoutes = require('./routes/authRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Example route
app.get('/', (req, res) => {          
  res.send('Welcome to QuickHire API!');
});

module.exports = app;
