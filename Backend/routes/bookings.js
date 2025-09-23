const express = require('express');
const BookingController = require('../controllers/BookingController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.post('/', (req, res) => BookingController.create(req, res));

// Routes protégées (admin uniquement)
router.get('/', auth, (req, res) => BookingController.getAll(req, res));
router.get('/stats', auth, (req, res) => BookingController.getStats(req, res));
router.get('/:id', auth, (req, res) => BookingController.getById(req, res));
router.put('/:id', auth, (req, res) => BookingController.update(req, res));
router.delete('/:id', auth, (req, res) => BookingController.delete(req, res));
router.patch('/:id/confirm', auth, (req, res) => BookingController.confirm(req, res));
router.patch('/:id/cancel', auth, (req, res) => BookingController.cancel(req, res));
router.patch('/:id/status', auth, (req, res) => BookingController.updateStatus(req, res));

module.exports = router;