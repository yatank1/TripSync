const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// Get all hotels
router.get('/', hotelController.getAllHotels);

// Get hotel by ID
router.get('/:id', hotelController.getHotelById);

// Search hotels by location
router.get('/search/:location', hotelController.searchHotelsByLocation);

// Book a hotel
router.post('/book', hotelController.bookHotel);

module.exports = router;
