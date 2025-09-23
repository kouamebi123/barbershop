const express = require('express');
const ServiceController = require('../controllers/ServiceController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.get('/', (req, res) => ServiceController.getAll(req, res));
router.get('/categories', (req, res) => ServiceController.getCategories(req, res));
router.get('/category/:category', (req, res) => ServiceController.getByCategory(req, res));
router.get('/location/:locationId', (req, res) => ServiceController.getByLocation(req, res));
router.get('/:id', (req, res) => ServiceController.getById(req, res));

// Routes protégées (admin uniquement)
router.post('/', auth, (req, res) => ServiceController.create(req, res));
router.put('/:id', auth, (req, res) => ServiceController.update(req, res));
router.delete('/:id', auth, (req, res) => ServiceController.delete(req, res));
router.patch('/:id/status', auth, (req, res) => ServiceController.toggleStatus(req, res));

module.exports = router;