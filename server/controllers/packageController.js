const { pool } = require('../config/db');

// Get all travel packages
exports.getAllPackages = async (req, res) => {
  try {
    const [packages] = await pool.query('SELECT * FROM travel_packages');
    res.status(200).json(packages);
  } catch (error) {
    console.error('Error fetching travel packages:', error);
    res.status(500).json({ message: 'Server error while fetching travel packages' });
  }
};

// Get travel package by ID
exports.getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const [packages] = await pool.query('SELECT * FROM travel_packages WHERE id = ?', [id]);
    
    if (packages.length === 0) {
      return res.status(404).json({ message: 'Travel package not found' });
    }
    
    res.status(200).json(packages[0]);
  } catch (error) {
    console.error('Error fetching travel package:', error);
    res.status(500).json({ message: 'Server error while fetching travel package' });
  }
};

// Search travel packages by destination
exports.searchPackagesByDestination = async (req, res) => {
  try {
    const { destination } = req.params;
    const [packages] = await pool.query('SELECT * FROM travel_packages WHERE destination LIKE ?', [`%${destination}%`]);
    res.status(200).json(packages);
  } catch (error) {
    console.error('Error searching travel packages:', error);
    res.status(500).json({ message: 'Server error while searching travel packages' });
  }
};

// Book a travel package
exports.bookPackage = async (req, res) => {
  try {
    const { user_id, package_id, check_in_date, total_price } = req.body;
    
    // Validate input
    if (!user_id || !package_id || !check_in_date || !total_price) {
      return res.status(400).json({ message: 'Please provide all required booking details' });
    }
    
    // Insert booking into database
    const [result] = await pool.query(
      'INSERT INTO bookings (user_id, package_id, check_in_date, total_price) VALUES (?, ?, ?, ?)',
      [user_id, package_id, check_in_date, total_price]
    );
    
    res.status(201).json({
      message: 'Travel package booked successfully',
      booking_id: result.insertId
    });
  } catch (error) {
    console.error('Error booking travel package:', error);
    res.status(500).json({ message: 'Server error while booking travel package' });
  }
};
