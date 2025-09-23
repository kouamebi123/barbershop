const express = require('express');
const ContactController = require('../controllers/ContactController');

const router = express.Router();

// Route pour envoyer le formulaire de contact
router.post('/', (req, res) => ContactController.sendContactForm(req, res));

module.exports = router;