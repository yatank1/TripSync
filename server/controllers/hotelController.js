const { pool } = require('../config/db');

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const [hotels] = await pool.query('SELECT * FROM hotels');
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({ message: 'Server error while fetching hotels' });
  }
};

// Get hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const { id } = req.params;
    const [hotels] = await pool.query('SELECT * FROM hotels WHERE id = ?', [id]);
    
    if (hotels.length === 0) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    
    res.status(200).json(hotels[0]);
  } catch (error) {
    console.error('Error fetching hotel:', error);
    res.status(500).json({ message: 'Server error while fetching hotel' });
  }
};

// Search hotels by location
exports.searchHotelsByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const [hotels] = await pool.query('SELECT * FROM hotels WHERE location LIKE ?', [`%${location}%`]);
    res.status(200).json(hotels);
  } catch (error) {
    console.error('Error searching hotels:', error);
    res.status(500).json({ message: 'Server error while searching hotels' });
  }
};

// Book a hotel
exports.bookHotel = async (req, res) => {
  try {
    const { user_id, hotel_id, check_in_date, check_out_date, total_price } = req.body;
    
    // Validate input
    if (!user_id || !hotel_id || !check_in_date || !check_out_date || !total_price) {
      return res.status(400).json({ message: 'Please provide all required booking details' });
    }
    
    // Insert booking into database
    const [result] = await pool.query(
      'INSERT INTO bookings (user_id, hotel_id, check_in_date, check_out_date, total_price) VALUES (?, ?, ?, ?, ?)',
      [user_id, hotel_id, check_in_date, check_out_date, total_price]
    );
    
    res.status(201).json({
      message: 'Hotel booked successfully',
      booking_id: result.insertId
    });
  } catch (error) {
    console.error('Error booking hotel:', error);
    res.status(500).json({ message: 'Server error while booking hotel' });
  }
};
