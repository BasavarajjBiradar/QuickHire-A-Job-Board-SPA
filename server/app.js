const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobpostroute");
const applicationRoutes = require("./routes/applicationRoute");

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api", applicationRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to QuickHire API!");
});

module.exports=app;





