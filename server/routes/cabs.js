const express = require('express');
const router = express.Router();
const cabController = require('../controllers/cabController');

// Get all cabs
router.get('/', cabController.getAllCabs);

// Get cab by ID
router.get('/:id', cabController.getCabById);

// Book a cab
router.post('/book', cabController.bookCab);

module.exports = router;
