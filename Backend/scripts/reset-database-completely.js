const { testConnection, sequelize } = require('../config/database');
const { Location, Service, Admin, Testimonial, Booking } = require('../models');

const resetDatabaseCompletely = async () => {
  try {
    console.log('🚀 Reset complet de la base de données...');
    
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
    
    // Initialiser les données
    console.log('🌱 Initialisation des données...');
    const seedProductionData = require('./seed-production');
    await seedProductionData();
    
    console.log('✅ Base de données complètement réinitialisée !');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Erreur lors du reset de la base de données:', error);
    process.exit(1);
  }
};

resetDatabaseCompletely();
