const { testConnection, sequelize } = require('../config/database');
const { Location, Service, Booking, Admin, Testimonial } = require('../models');
const seedProductionData = require('./seed-production');

const startProduction = async () => {
  try {
    console.log('🚀 Démarrage de l\'application en production...');
    
    // Tester la connexion à la base de données
    await testConnection();
    
    // Désactiver les contraintes de clés étrangères
    console.log('🔄 Désactivation des contraintes de clés étrangères...');
    await sequelize.query('SET session_replication_role = replica;');
    
    // Supprimer toutes les tables dans l'ordre inverse des dépendances
    console.log('🗑️  Suppression de toutes les tables...');
    
    const tables = [
      'booking_services',
      'testimonials', 
      'bookings',
      'services',
      'locations',
      'admins'
    ];
    
    for (const table of tables) {
      try {
        await sequelize.query(`DROP TABLE IF EXISTS "${table}" CASCADE;`);
        console.log(`✅ Table ${table} supprimée`);
      } catch (error) {
        console.log(`ℹ️  Table ${table} n'existait pas ou déjà supprimée`);
      }
    }
    
    // Réactiver les contraintes de clés étrangères
    console.log('🔄 Réactivation des contraintes de clés étrangères...');
    await sequelize.query('SET session_replication_role = DEFAULT;');
    
    // Synchroniser la base de données (créer toutes les tables)
    console.log('🔄 Création de toutes les tables...');
    await sequelize.sync({ force: false });
    console.log('✅ Tables créées');
    
    // Ajouter les index
    const addIndexes = require('./add-indexes');
    await addIndexes();
    
    // Initialiser les données
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
