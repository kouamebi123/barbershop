const { testConnection } = require('../config/database');
const seedProductionData = require('./seed-production');

const startProduction = async () => {
  try {
    console.log('🚀 Démarrage de l\'application en production...');
    
    // Tester la connexion à la base de données
    await testConnection();
    
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
