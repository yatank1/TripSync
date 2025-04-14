const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Get all travel packages
router.get('/', packageController.getAllPackages);

// Get travel package by ID
router.get('/:id', packageController.getPackageById);

// Search travel packages by destination
router.get('/search/:destination', packageController.searchPackagesByDestination);

// Book a travel package
router.post('/book', packageController.bookPackage);

module.exports = router;
