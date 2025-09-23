const { sequelize, Location, Service } = require('../models');

const fixServicesLocations = async () => {
  try {
    console.log('🔧 Correction de l\'association services-locations...');

    // Récupérer toutes les locations
    const locations = await Location.findAll({ where: { isActive: true } });
    console.log(`✅ ${locations.length} locations trouvées`);

    // Récupérer tous les services uniques (sans doublons)
    const services = await Service.findAll({
      where: { isActive: true },
      attributes: ['name', 'price', 'duration', 'category', 'description', 'imageUrl', 'requiresBarber', 'maxConcurrentBookings']
    });

    console.log(`✅ ${services.length} services uniques trouvés`);

    // Supprimer tous les services existants
    await Service.destroy({ where: {} });
    console.log('🗑️  Services existants supprimés');

    // Créer les services pour chaque location
    for (const location of locations) {
      console.log(`\n📍 Création des services pour ${location.name}:`);
      
      const servicesToCreate = [
        {
          name: 'Coupe de cheveux',
          description: 'Coupe de cheveux moderne et personnalisée selon votre style',
          price: 25.00,
          duration: 30,
          category: 'coupe',
          isActive: true,
          imageUrl: null,
          requiresBarber: true,
          maxConcurrentBookings: 1,
          locationId: location.id
        },
        {
          name: 'Taille de barbe',
          description: 'Taille de barbe précise et soignée avec des outils professionnels',
          price: 20.00,
          duration: 25,
          category: 'barbe',
          isActive: true,
          imageUrl: null,
          requiresBarber: true,
          maxConcurrentBookings: 1,
          locationId: location.id
        },
        {
          name: 'Rasage traditionnel',
          description: 'Rasage à l\'ancienne avec blaireau et savon à barbe',
          price: 30.00,
          duration: 40,
          category: 'barbe',
          isActive: true,
          imageUrl: null,
          requiresBarber: true,
          maxConcurrentBookings: 1,
          locationId: location.id
        },
        {
          name: 'Coupe + Barbe',
          description: 'Package complet : coupe de cheveux et taille de barbe',
          price: 40.00,
          duration: 50,
          category: 'combo',
          isActive: true,
          imageUrl: null,
          requiresBarber: true,
          maxConcurrentBookings: 1,
          locationId: location.id
        },
        {
          name: 'Soins du visage',
          description: 'Soins relaxants pour une peau saine et éclatante',
          price: 35.00,
          duration: 45,
          category: 'soins',
          isActive: true,
          imageUrl: null,
          requiresBarber: true,
          maxConcurrentBookings: 1,
          locationId: location.id
        },
        {
          name: 'Coupe Premium',
          description: 'Coupe de cheveux haut de gamme avec produits premium',
          price: 45.00,
          duration: 60,
          category: 'coupe',
          isActive: true,
          imageUrl: null,
          requiresBarber: true,
          maxConcurrentBookings: 1,
          locationId: location.id
        }
      ];

      for (const serviceData of servicesToCreate) {
        await Service.create(serviceData);
        console.log(`   ✅ ${serviceData.name} créé`);
      }
    }

    // Vérifier le résultat
    const totalServices = await Service.count();
    console.log(`\n📊 Total des services créés: ${totalServices}`);

    for (const location of locations) {
      const locationServices = await Service.count({ where: { locationId: location.id } });
      console.log(`   ${location.name}: ${locationServices} services`);
    }

    console.log('\n🎉 Correction terminée avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de la correction:', error);
  } finally {
    await sequelize.close();
  }
};

// Exécuter la correction
fixServicesLocations();
