const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage du frontend...');

// Vérifier que le backend est accessible
const checkBackend = async () => {
  try {
    const axios = require('axios');
    const response = await axios.get('http://localhost:3001/api/health');
    console.log('✅ Backend accessible sur le port 3001');
    return true;
  } catch (error) {
    console.log('⚠️  Backend non accessible sur le port 3001');
    console.log('   Assurez-vous que le backend est démarré avec: cd Backend && PORT=3001 npm start');
    return false;
  }
};

// Démarrer le frontend
const startFrontend = () => {
  const frontendPath = path.join(__dirname, '..');
  
  console.log('📦 Installation des dépendances...');
  const install = spawn('npm', ['install'], { 
    cwd: frontendPath, 
    stdio: 'inherit',
    shell: true 
  });

  install.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Dépendances installées');
      console.log('🎨 Démarrage du serveur de développement...');
      
      const start = spawn('npm', ['start'], { 
        cwd: frontendPath, 
        stdio: 'inherit',
        shell: true 
      });

      start.on('close', (code) => {
        console.log(`Frontend arrêté avec le code ${code}`);
      });
    } else {
      console.error('❌ Erreur lors de l\'installation des dépendances');
    }
  });
};

// Vérifier le backend puis démarrer le frontend
checkBackend().then(backendOk => {
  if (backendOk) {
    startFrontend();
  } else {
    console.log('💡 Vous pouvez démarrer le frontend quand même, mais les appels API échoueront');
    startFrontend();
  }
});
