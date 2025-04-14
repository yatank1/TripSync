const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

// Get all travel guides
router.get('/', guideController.getAllGuides);

// Get travel guide by ID
router.get('/:id', guideController.getGuideById);

// Search travel guides by location
router.get('/search/:location', guideController.searchGuidesByLocation);

// Book a travel guide
router.post('/book', guideController.bookGuide);

module.exports = router;
