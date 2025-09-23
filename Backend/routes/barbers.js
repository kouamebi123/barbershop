const express = require('express');
const BarberController = require('../controllers/BarberController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.get('/', (req, res) => BarberController.getAll(req, res));
router.get('/specialization/:specialization', (req, res) => BarberController.getBySpecialization(req, res));
router.get('/:id', (req, res) => BarberController.getById(req, res));
router.get('/:id/stats', (req, res) => BarberController.getStats(req, res));

// Routes protégées (admin uniquement)
router.post('/', auth, (req, res) => BarberController.create(req, res));
router.put('/:id', auth, (req, res) => BarberController.update(req, res));
router.delete('/:id', auth, (req, res) => BarberController.delete(req, res));
router.patch('/:id/status', auth, (req, res) => BarberController.toggleStatus(req, res));
router.post('/:id/locations', auth, (req, res) => BarberController.addToLocation(req, res));
router.delete('/:id/locations', auth, (req, res) => BarberController.removeFromLocation(req, res));

module.exports = router;