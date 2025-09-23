const express = require('express');
const AdminController = require('../controllers/AdminController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Toutes les routes admin sont protégées
router.use(auth);

// Dashboard
router.get('/dashboard', (req, res) => AdminController.getDashboard(req, res));

// Gestion des administrateurs
router.get('/admins', (req, res) => AdminController.getAllAdmins(req, res));
router.post('/admins', (req, res) => AdminController.createAdmin(req, res));
router.put('/admins/:id', (req, res) => AdminController.updateAdmin(req, res));
router.delete('/admins/:id', (req, res) => AdminController.deleteAdmin(req, res));

// Export de données
router.get('/export/bookings', (req, res) => AdminController.exportBookings(req, res));

module.exports = router;