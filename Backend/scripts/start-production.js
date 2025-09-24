const { testConnection, sequelize } = require('../config/database');
const { Location, Service, Booking, Admin, Testimonial } = require('../models');
const seedProductionData = require('./seed-production');

const startProduction = async () => {
  try {
    console.log('🚀 Démarrage de l\'application en production...');
    
    // Tester la connexion à la base de données
    await testConnection();
    
    // Synchroniser la base de données (créer les tables si elles n'existent pas)
    console.log('🔄 Synchronisation de la base de données...');
    await sequelize.sync({ alter: true });
    console.log('✅ Tables synchronisées');
    
    // Initialiser les données si nécessaire
    await seedProductionData();
    
    // Démarrer le serveur
    console.log('✅ Base de données prête, démarrage du serveur...');
    require('../server');
    
  } catch (error) {
    console.error('❌ Erreur lors du démarrage:', error);
    process.exit(1);
  }
};

startProduction();
