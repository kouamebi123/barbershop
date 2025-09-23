const { sequelize } = require('../models');
const { testConnection } = require('../config/database');

const startClean = async () => {
  try {
    console.log('🚀 Démarrage avec données propres...');

    // Tester la connexion
    await testConnection();

    // Vérifier si la base de données est vide
    const { Location, Barber, Service, Admin } = require('../models');
    
    const locationCount = await Location.count();
    const barberCount = await Barber.count();
    const serviceCount = await Service.count();
    const adminCount = await Admin.count();

    console.log('📊 État actuel de la base de données:');
    console.log(`   - ${locationCount} locations`);
    console.log(`   - ${barberCount} coiffeurs`);
    console.log(`   - ${serviceCount} services`);
    console.log(`   - ${adminCount} admins`);

    if (locationCount === 0 || barberCount === 0 || serviceCount === 0) {
      console.log('⚠️  Base de données vide ou incomplète');
      console.log('💡 Exécutez "npm run seed" pour insérer des données de test');
    } else {
      console.log('✅ Base de données prête');
    }

    // Démarrer le serveur
    require('../server.js');

  } catch (error) {
    console.error('❌ Erreur lors du démarrage:', error);
    process.exit(1);
  }
};

startClean();
