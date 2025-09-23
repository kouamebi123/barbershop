const { execSync } = require('child_process');
const { testConnection } = require('../config/database');

const initDatabase = async () => {
  try {
    console.log('🔄 Initialisation de la base de données...');
    
    // Créer la base de données si elle n'existe pas
    try {
      execSync('createdb barbershop_db', { stdio: 'pipe' });
      console.log('✅ Base de données créée');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️  Base de données existe déjà');
      } else {
        throw error;
      }
    }
    
    // Tester la connexion
    await testConnection();
    
    // Exécuter les migrations
    console.log('🔄 Exécution des migrations...');
    require('./migrate');
    
    console.log('🎉 Base de données initialisée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error.message);
    process.exit(1);
  }
};

// Exécuter si le script est appelé directement
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };
