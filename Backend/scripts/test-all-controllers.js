const axios = require('axios');

const API_BASE_URL = 'http://localhost:3001/api';

async function testAllControllers() {
  console.log('🧪 Test de tous les contrôleurs\n');

  const tests = [
    { name: 'Health', url: '/health' },
    { name: 'Stats', url: '/stats/general' },
    { name: 'Locations', url: '/locations' },
    { name: 'Services', url: '/services' },
    { name: 'Barbers', url: '/barbers' },
    { name: 'Bookings Availability', url: '/bookings/availability?locationId=test&date=2024-01-01' }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`🔍 Test ${test.name}...`);
      const response = await axios.get(`${API_BASE_URL}${test.url}`);
      
      if (response.status === 200) {
        console.log(`✅ ${test.name}: OK`);
        passed++;
      } else {
        console.log(`❌ ${test.name}: Status ${response.status}`);
        failed++;
      }
    } catch (error) {
      if (error.response) {
        console.log(`⚠️  ${test.name}: ${error.response.status} - ${error.response.data?.message || 'Erreur'}`);
      } else {
        console.log(`❌ ${test.name}: ${error.message}`);
      }
      failed++;
    }
  }

  console.log(`\n📊 Résultats:`);
  console.log(`   ✅ Réussis: ${passed}`);
  console.log(`   ❌ Échecs: ${failed}`);
  console.log(`   📈 Taux de réussite: ${Math.round((passed / (passed + failed)) * 100)}%`);

  if (failed === 0) {
    console.log('\n🎉 Tous les contrôleurs fonctionnent parfaitement !');
  } else {
    console.log('\n⚠️  Certains contrôleurs ont des problèmes.');
  }
}

testAllControllers().catch(console.error);
