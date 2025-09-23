const { sequelize } = require('../config/database');
const { Location, Service } = require('../models');

async function associateServicesLocations() {
  try {
    console.log('🔗 Association des services aux salons...');
    
    // Récupérer tous les salons
    const locations = await Location.findAll();
    console.log(`✅ ${locations.length} salons trouvés`);
    
    // Récupérer tous les services
    const services = await Service.findAll();
    console.log(`✅ ${services.length} services trouvés`);
    
    // Associer chaque service à tous les salons qui supportent le genre du service
    for (const service of services) {
      const compatibleLocations = locations.filter(location => 
        location.supported_genders.includes(service.gender) || 
        location.supported_genders.includes('unisex')
      );
      
      for (const location of compatibleLocations) {
        await service.setLocation(location);
        console.log(`✅ Service "${service.name}" associé au salon "${location.name}"`);
      }
    }
    
    console.log('🎉 Association terminée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'association:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Exécuter le script
associateServicesLocations()
  .then(() => {
    console.log('✅ Script terminé avec succès');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erreur:', error);
    process.exit(1);
  });
