const express = require('express');
const AuthController = require('../controllers/AuthController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.post('/login', (req, res) => AuthController.login(req, res));
router.post('/register', (req, res) => AuthController.register(req, res));
router.post('/verify', (req, res) => AuthController.verifyToken(req, res));

// Routes protégées
router.get('/profile', auth, (req, res) => AuthController.getProfile(req, res));
router.put('/profile', auth, (req, res) => AuthController.updateProfile(req, res));
router.put('/change-password', auth, (req, res) => AuthController.changePassword(req, res));
router.post('/logout', auth, (req, res) => AuthController.logout(req, res));

module.exports = router;