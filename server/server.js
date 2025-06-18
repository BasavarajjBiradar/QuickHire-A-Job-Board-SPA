const app = require('./app');
const connectDB = require('./config/db');

// Start MongoDB connection first
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
