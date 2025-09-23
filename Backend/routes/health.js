const express = require('express');
const HealthController = require('../controllers/HealthController');

const router = express.Router();

// Route de santé
router.get('/', (req, res) => HealthController.getHealth(req, res));

module.exports = router;
