// Script de test pour vérifier la connectivité frontend
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api';

async function testFrontendAPI() {
  console.log('🔍 Test de connectivité Frontend API...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Test Health Check...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health Check:', healthResponse.data.success ? 'OK' : 'FAILED');
    console.log('   Data structure:', Object.keys(healthResponse.data));
    console.log('   Data.data structure:', Object.keys(healthResponse.data.data || {}));
    console.log('');
    
    // Test 2: Locations
    console.log('2. Test Locations...');
    const locationsResponse = await axios.get(`${API_BASE_URL}/locations`);
    console.log('✅ Locations:', locationsResponse.data.success ? 'OK' : 'FAILED');
    console.log('   Response structure:', Object.keys(locationsResponse.data));
    console.log('   Data type:', Array.isArray(locationsResponse.data.data) ? 'Array' : typeof locationsResponse.data.data);
    console.log('   Data length:', locationsResponse.data.data.length);
    console.log('   First location keys:', Object.keys(locationsResponse.data.data[0] || {}).slice(0, 5));
    console.log('');
    
    // Test 3: Services
    console.log('3. Test Services...');
    const servicesResponse = await axios.get(`${API_BASE_URL}/services`);
    console.log('✅ Services:', servicesResponse.data.success ? 'OK' : 'FAILED');
    console.log('   Response structure:', Object.keys(servicesResponse.data));
    console.log('   Data type:', Array.isArray(servicesResponse.data.data) ? 'Array' : typeof servicesResponse.data.data);
    console.log('   Data length:', servicesResponse.data.data.length);
    console.log('   First service keys:', Object.keys(servicesResponse.data.data[0] || {}).slice(0, 5));
    console.log('');
    
    // Test 4: Services avec structure attendue
    console.log('4. Test Services Structure...');
    if (servicesResponse.data.data && typeof servicesResponse.data.data === 'object') {
      if (Array.isArray(servicesResponse.data.data)) {
        console.log('   ✅ Data is array (correct)');
      } else if (servicesResponse.data.data.services) {
        console.log('   ✅ Data has services property');
        console.log('   Services count:', servicesResponse.data.data.services.length);
      } else {
        console.log('   ❌ Data structure unexpected:', Object.keys(servicesResponse.data.data));
      }
    }
    console.log('');
    
    console.log('🎉 Test Frontend API terminé !');
    
  } catch (error) {
    console.error('❌ Erreur lors du test Frontend API:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
  }
}

testFrontendAPI();
