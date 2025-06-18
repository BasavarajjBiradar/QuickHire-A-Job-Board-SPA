const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' }); // Optional redundancy

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to QuickHire API!');
});

module.exports = app;
