const express = require('express');
const LocationController = require('../controllers/LocationController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.get('/', (req, res) => LocationController.getAll(req, res));
router.get('/:id', (req, res) => LocationController.getById(req, res));
router.get('/:id/stats', (req, res) => LocationController.getStats(req, res));

// Routes protégées (admin uniquement)
router.post('/', auth, (req, res) => LocationController.create(req, res));
router.put('/:id', auth, (req, res) => LocationController.update(req, res));
router.delete('/:id', auth, (req, res) => LocationController.delete(req, res));
router.patch('/:id/status', auth, (req, res) => LocationController.toggleStatus(req, res));

module.exports = router;