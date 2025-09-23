const express = require('express');
const StatsController = require('../controllers/StatsController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.get('/general', (req, res) => StatsController.getGeneralStats(req, res));

// Routes protégées (admin uniquement)
router.get('/dashboard', auth, (req, res) => StatsController.getDashboardStats(req, res));

module.exports = router;
