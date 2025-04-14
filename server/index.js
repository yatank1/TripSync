const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const hotelRoutes = require('./routes/hotels');
const cabRoutes = require('./routes/cabs');
const guideRoutes = require('./routes/guides');
const packageRoutes = require('./routes/packages');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/cabs', cabRoutes);
app.use('/api/guides', guideRoutes);
app.use('/api/packages', packageRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to TripSync API');
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
