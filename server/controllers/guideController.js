const { pool } = require('../config/db');

// Get all travel guides
exports.getAllGuides = async (req, res) => {
  try {
    const [guides] = await pool.query('SELECT * FROM travel_guides');
    res.status(200).json(guides);
  } catch (error) {
    console.error('Error fetching travel guides:', error);
    res.status(500).json({ message: 'Server error while fetching travel guides' });
  }
};

// Get travel guide by ID
exports.getGuideById = async (req, res) => {
  try {
    const { id } = req.params;
    const [guides] = await pool.query('SELECT * FROM travel_guides WHERE id = ?', [id]);
    
    if (guides.length === 0) {
      return res.status(404).json({ message: 'Travel guide not found' });
    }
    
    res.status(200).json(guides[0]);
  } catch (error) {
    console.error('Error fetching travel guide:', error);
    res.status(500).json({ message: 'Server error while fetching travel guide' });
  }
};

// Search travel guides by location
exports.searchGuidesByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const [guides] = await pool.query('SELECT * FROM travel_guides WHERE location LIKE ?', [`%${location}%`]);
    res.status(200).json(guides);
  } catch (error) {
    console.error('Error searching travel guides:', error);
    res.status(500).json({ message: 'Server error while searching travel guides' });
  }
};

// Book a travel guide
exports.bookGuide = async (req, res) => {
  try {
    const { user_id, guide_id, check_in_date, check_out_date, total_price } = req.body;
    
    // Validate input
    if (!user_id || !guide_id || !check_in_date || !check_out_date || !total_price) {
      return res.status(400).json({ message: 'Please provide all required booking details' });
    }
    
    // Insert booking into database
    const [result] = await pool.query(
      'INSERT INTO bookings (user_id, guide_id, check_in_date, check_out_date, total_price) VALUES (?, ?, ?, ?, ?)',
      [user_id, guide_id, check_in_date, check_out_date, total_price]
    );
    
    res.status(201).json({
      message: 'Travel guide booked successfully',
      booking_id: result.insertId
    });
  } catch (error) {
    console.error('Error booking travel guide:', error);
    res.status(500).json({ message: 'Server error while booking travel guide' });
  }
};
