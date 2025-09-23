const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Initialiser les services
const schedulerService = require('./services/schedulerService');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware de sécurité
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite de 100 requêtes par IP
});
app.use(limiter);

// Middleware pour parser JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/locations', require('./routes/locations'));
app.use('/api/services', require('./routes/services'));
app.use('/api/barbers', require('./routes/barbers'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/health', require('./routes/health'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/bookings/availability', require('./routes/availability'));

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée',
    path: req.originalUrl 
  });
});

// Gestionnaire d'erreurs global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
  });
});

// Tester la connexion à la base de données
testConnection();

app.listen(PORT, () => {
  console.log(`🚀 Serveur Barbershop API démarré sur le port ${PORT}`);
  console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📧 Notifications email: ${process.env.EMAIL_ENABLED === 'true' ? 'Activées' : 'Désactivées'}`);
  console.log(`📱 Notifications SMS: ${process.env.SMS_ENABLED === 'true' ? 'Activées' : 'Désactivées'}`);
  console.log(`⏰ Planificateur: ${schedulerService.getJobsStatus()}`);
});
