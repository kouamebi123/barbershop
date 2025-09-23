const axios = require('axios');

const testAPIResponses = async () => {
  try {
    console.log('🧪 Test des réponses API...\n');

    // Test 1: Locations
    console.log('📍 Test API Locations:');
    const locationsResponse = await axios.get('http://localhost:3001/api/locations');
    console.log(`   Status: ${locationsResponse.status}`);
    console.log(`   Structure: ${Object.keys(locationsResponse.data).join(', ')}`);
    console.log(`   Nombre de locations: ${locationsResponse.data.locations?.length || 0}\n`);

    // Test 2: Services
    console.log('✂️ Test API Services:');
    const servicesResponse = await axios.get('http://localhost:3001/api/services');
    console.log(`   Status: ${servicesResponse.status}`);
    console.log(`   Structure: ${Object.keys(servicesResponse.data).join(', ')}`);
    console.log(`   Nombre de services: ${servicesResponse.data.services?.length || 0}`);
    console.log(`   Catégories: ${Object.keys(servicesResponse.data.servicesByCategory || {}).join(', ')}\n`);

    // Test 3: Barbers
    console.log('👨‍💼 Test API Barbers:');
    const barbersResponse = await axios.get('http://localhost:3001/api/barbers');
    console.log(`   Status: ${barbersResponse.status}`);
    console.log(`   Structure: ${Object.keys(barbersResponse.data).join(', ')}`);
    console.log(`   Nombre de coiffeurs: ${barbersResponse.data.barbers?.length || 0}\n`);

    // Test 4: Health
    console.log('❤️ Test API Health:');
    const healthResponse = await axios.get('http://localhost:3001/api/health');
    console.log(`   Status: ${healthResponse.status}`);
    console.log(`   Message: ${healthResponse.data.message}\n`);

    console.log('✅ Tous les tests API sont passés avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors des tests API:', error.message);
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
  }
};

// Exécuter les tests
testAPIResponses();
