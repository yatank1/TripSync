const { pool } = require('../config/db');

// Get all cabs
exports.getAllCabs = async (req, res) => {
  try {
    const [cabs] = await pool.query('SELECT * FROM cabs');
    res.status(200).json(cabs);
  } catch (error) {
    console.error('Error fetching cabs:', error);
    res.status(500).json({ message: 'Server error while fetching cabs' });
  }
};

// Get cab by ID
exports.getCabById = async (req, res) => {
  try {
    const { id } = req.params;
    const [cabs] = await pool.query('SELECT * FROM cabs WHERE id = ?', [id]);
    
    if (cabs.length === 0) {
      return res.status(404).json({ message: 'Cab not found' });
    }
    
    res.status(200).json(cabs[0]);
  } catch (error) {
    console.error('Error fetching cab:', error);
    res.status(500).json({ message: 'Server error while fetching cab' });
  }
};

// Book a cab
exports.bookCab = async (req, res) => {
  try {
    const { user_id, cab_id, pickup_location, dropoff_location, total_price } = req.body;
    
    // Validate input
    if (!user_id || !cab_id || !pickup_location || !dropoff_location || !total_price) {
      return res.status(400).json({ message: 'Please provide all required booking details' });
    }
    
    // Insert booking into database
    const [result] = await pool.query(
      'INSERT INTO bookings (user_id, cab_id, pickup_location, dropoff_location, total_price) VALUES (?, ?, ?, ?, ?)',
      [user_id, cab_id, pickup_location, dropoff_location, total_price]
    );
    
    res.status(201).json({
      message: 'Cab booked successfully',
      booking_id: result.insertId
    });
  } catch (error) {
    console.error('Error booking cab:', error);
    res.status(500).json({ message: 'Server error while booking cab' });
  }
};
