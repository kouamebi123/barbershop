const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/api';

async function testFullIntegration() {
  console.log('🧪 Test d\'intégration complète Frontend-Backend\n');

  try {
    // 1. Test de santé du serveur
    console.log('1️⃣ Test de santé du serveur...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Serveur en ligne:', healthResponse.data.message);

    // 2. Test des statistiques
    console.log('\n2️⃣ Test des statistiques...');
    const statsResponse = await axios.get(`${API_BASE_URL}/stats/general`);
    console.log('✅ Statistiques récupérées:', statsResponse.data.data);

    // 3. Test des locations
    console.log('\n3️⃣ Test des locations...');
    const locationsResponse = await axios.get(`${API_BASE_URL}/locations`);
    console.log(`✅ ${locationsResponse.data.locations.length} locations trouvées`);

    // 4. Test des services
    console.log('\n4️⃣ Test des services...');
    const servicesResponse = await axios.get(`${API_BASE_URL}/services`);
    console.log(`✅ ${servicesResponse.data.services.length} services trouvés`);

    // 5. Test des barbers
    console.log('\n5️⃣ Test des barbers...');
    const barbersResponse = await axios.get(`${API_BASE_URL}/barbers`);
    console.log(`✅ ${barbersResponse.data.barbers.length} barbers trouvés`);

    // 6. Test des catégories de services
    console.log('\n6️⃣ Test des catégories...');
    const categoriesResponse = await axios.get(`${API_BASE_URL}/services/categories`);
    console.log('✅ Catégories:', categoriesResponse.data.categories);

    // 7. Test de disponibilité des réservations
    console.log('\n7️⃣ Test de disponibilité...');
    const availabilityResponse = await axios.get(`${API_BASE_URL}/bookings/availability`, {
      params: {
        locationId: locationsResponse.data.locations[0].id,
        date: new Date().toISOString().split('T')[0]
      }
    });
    console.log('✅ Disponibilité récupérée');

    console.log('\n🎉 Tous les tests sont passés avec succès !');
    console.log('\n📊 Résumé des données:');
    console.log(`   - ${statsResponse.data.data.totalLocations} salons`);
    console.log(`   - ${statsResponse.data.data.totalBarbers} coiffeurs`);
    console.log(`   - ${statsResponse.data.data.totalServices} services`);
    console.log(`   - ${statsResponse.data.data.totalBookings} réservations`);
    console.log(`   - ${statsResponse.data.data.totalRevenue}€ de chiffre d'affaires`);

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    if (error.response) {
      console.error('   Détails:', error.response.data);
    }
  }
}

testFullIntegration();
