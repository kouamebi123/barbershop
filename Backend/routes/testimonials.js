const express = require('express');
const TestimonialControllerSimple = require('../controllers/TestimonialControllerSimple');
const { auth } = require('../middleware/auth');

const router = express.Router();
const testimonialController = new TestimonialControllerSimple();

// Routes publiques
router.get('/', (req, res) => TestimonialControllerSimple.getAll(req, res));
router.post('/', (req, res) => testimonialController.create(req, res));

// Routes protégées (admin uniquement) - TODO: Implémenter avec le contrôleur simplifié
// router.get('/admin', auth, (req, res) => TestimonialControllerSimple.getAllAdmin(req, res));
// router.patch('/:id/status', auth, (req, res) => testimonialController.updateStatus(req, res));
// router.delete('/:id', auth, (req, res) => TestimonialControllerSimple.delete(req, res));
// router.get('/admin/stats', auth, (req, res) => TestimonialControllerSimple.getStats(req, res));

module.exports = router;
