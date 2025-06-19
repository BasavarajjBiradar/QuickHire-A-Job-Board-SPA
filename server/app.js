const express = require('express');
const cors = require('cors');

const jobRoutes = require('./routes/jobpostroute');
require('dotenv').config({ path: __dirname + '/.env' });

const app = express();




const authRoutes = require('./routes/authRoutes');



// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Example route

app.use(cors());
app.use(express.json()); 


app.use('/jobs', jobRoutes); 


app.get('/', (req, res) => {
  res.send('Welcome to QuickHire API!');
});

module.exports = app;
