const { execSync } = require('child_process');
const { testConnection } = require('../config/database');

const initDatabaseWithDocker = async () => {
  try {
    console.log('🔄 Initialisation de la base de données avec Docker...');
    
    // Vérifier si Docker est installé
    try {
      execSync('docker --version', { stdio: 'pipe' });
    } catch (error) {
      throw new Error('Docker n\'est pas installé. Veuillez installer Docker Desktop.');
    }
    
    // Vérifier si le conteneur existe déjà
    let containerExists = false;
    try {
      execSync('docker ps -a --filter name=barbershop-postgres --format "{{.Names}}"', { stdio: 'pipe' });
      const result = execSync('docker ps -a --filter name=barbershop-postgres --format "{{.Names}}"', { encoding: 'utf8' });
      containerExists = result.trim() === 'barbershop-postgres';
    } catch (error) {
      // Le conteneur n'existe pas
    }
    
    if (containerExists) {
      console.log('ℹ️  Conteneur PostgreSQL existe déjà');
      
      // Vérifier si le conteneur est en cours d'exécution
      try {
        execSync('docker ps --filter name=barbershop-postgres --format "{{.Names}}"', { stdio: 'pipe' });
        const result = execSync('docker ps --filter name=barbershop-postgres --format "{{.Names}}"', { encoding: 'utf8' });
        if (result.trim() !== 'barbershop-postgres') {
          console.log('🔄 Démarrage du conteneur...');
          execSync('docker start barbershop-postgres', { stdio: 'inherit' });
        } else {
          console.log('✅ Conteneur déjà en cours d\'exécution');
        }
      } catch (error) {
        console.log('🔄 Démarrage du conteneur...');
        execSync('docker start barbershop-postgres', { stdio: 'inherit' });
      }
    } else {
      console.log('🔄 Création du conteneur PostgreSQL...');
      execSync('docker run --name barbershop-postgres \
        -e POSTGRES_DB=barbershop_db \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=password \
        -p 5432:5432 \
        -d postgres:13', { stdio: 'inherit' });
      
      // Attendre que PostgreSQL soit prêt
      console.log('⏳ Attente du démarrage de PostgreSQL...');
      await new Promise(resolve => setTimeout(resolve, 5001));
    }
    
    // Tester la connexion
    console.log('🔄 Test de connexion à la base de données...');
    await testConnection();
    
    // Exécuter les migrations
    console.log('🔄 Exécution des migrations...');
    require('./migrate');
    
    console.log('🎉 Base de données initialisée avec succès !');
    console.log('📊 Données de test créées :');
    console.log('   - 2 salons à Rennes');
    console.log('   - 3 coiffeurs');
    console.log('   - 12 services');
    console.log('   - 1 admin (admin@barbershop-rennes.fr / admin123)');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error.message);
    console.log('\n💡 Solutions possibles :');
    console.log('   1. Installer Docker Desktop');
    console.log('   2. Installer PostgreSQL localement');
    console.log('   3. Vérifier que le port 5432 est libre');
    process.exit(1);
  }
};

// Exécuter si le script est appelé directement
if (require.main === module) {
  initDatabaseWithDocker();
}

module.exports = { initDatabaseWithDocker };
