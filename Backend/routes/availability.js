const express = require('express');
const AvailabilityController = require('../controllers/AvailabilityController');

const router = express.Router();

// Route pour récupérer les créneaux disponibles
router.get('/', (req, res) => AvailabilityController.getAvailability(req, res));

module.exports = router;
