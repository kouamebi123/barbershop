const { sequelize, Location, Service } = require('../models');

const associateServicesLocations = async () => {
  try {
    console.log('🔗 Association des services aux locations...');

    // Récupérer toutes les locations
    const locations = await Location.findAll({ where: { isActive: true } });
    console.log(`✅ ${locations.length} locations trouvées`);

    // Récupérer tous les services
    const services = await Service.findAll({ where: { isActive: true } });
    console.log(`✅ ${services.length} services trouvés`);

    // Associer chaque service à chaque location
    for (const service of services) {
      for (const location of locations) {
        try {
          await service.setLocation(location);
          console.log(`✅ Service "${service.name}" associé à "${location.name}"`);
        } catch (error) {
          console.log(`⚠️  Service "${service.name}" déjà associé à "${location.name}"`);
        }
      }
    }

    // Vérifier les associations
    for (const location of locations) {
      const locationServices = await location.getServices();
      console.log(`📍 ${location.name}: ${locationServices.length} services`);
    }

    console.log('🎉 Association terminée avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de l\'association:', error);
  } finally {
    await sequelize.close();
  }
};

// Exécuter l'association
associateServicesLocations();
