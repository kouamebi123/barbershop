const { Location, Service, Admin } = require('../models');
const bcrypt = require('bcryptjs');

const seedProductionData = async () => {
  try {
    console.log('🌱 Initialisation des données de production...');

    // Vérifier si des données existent déjà
    const existingLocations = await Location.count();
    if (existingLocations > 0) {
      console.log('ℹ️  Des données existent déjà, arrêt de l\'initialisation');
      return;
    }

    // Créer des locations
    const locations = await Location.bulkCreate([
      {
        name: 'Barbershop Rennes Centre',
        address: '15 Rue de la Paix, 35000 Rennes',
        city: 'Rennes',
        phone: '02 99 12 34 56',
        email: 'centre@barbershop-rennes.fr',
        latitude: 48.1173,
        longitude: -1.6778,
        isActive: true,
        openingHours: {
          monday: { open: '09:00', close: '19:00' },
          tuesday: { open: '09:00', close: '19:00' },
          wednesday: { open: '09:00', close: '19:00' },
          thursday: { open: '09:00', close: '19:00' },
          friday: { open: '09:00', close: '19:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '10:00', close: '17:00' }
        }
      },
      {
        name: 'Barbershop Rennes Sud',
        address: '42 Avenue de Bretagne, 35000 Rennes',
        city: 'Rennes',
        phone: '02 99 78 90 12',
        email: 'sud@barbershop-rennes.fr',
        latitude: 48.1000,
        longitude: -1.6500,
        isActive: true,
        openingHours: {
          monday: { open: '09:00', close: '19:00' },
          tuesday: { open: '09:00', close: '19:00' },
          wednesday: { open: '09:00', close: '19:00' },
          thursday: { open: '09:00', close: '19:00' },
          friday: { open: '09:00', close: '19:00' },
          saturday: { open: '09:00', close: '18:00' },
          sunday: { open: '10:00', close: '17:00' }
        }
      }
    ]);

    console.log(`✅ ${locations.length} locations créées`);

    // Créer des services
    const services = await Service.bulkCreate([
      {
        name: 'Coupe Homme',
        description: 'Coupe de cheveux moderne pour homme',
        price: 25,
        duration: 30,
        category: 'coupe',
        gender: 'homme',
        locationId: locations[0].id,
        isActive: true
      },
      {
        name: 'Coupe Femme',
        description: 'Coupe de cheveux élégante pour femme',
        price: 35,
        duration: 45,
        category: 'coupe',
        gender: 'femme',
        locationId: locations[0].id,
        isActive: true
      },
      {
        name: 'Barbe',
        description: 'Taille et entretien de la barbe',
        price: 20,
        duration: 25,
        category: 'barbe',
        gender: 'homme',
        locationId: locations[0].id,
        isActive: true
      },
      {
        name: 'Coupe + Barbe',
        description: 'Coupe de cheveux + taille de barbe',
        price: 40,
        duration: 50,
        category: 'combo',
        gender: 'homme',
        locationId: locations[0].id,
        isActive: true
      },
      {
        name: 'Coupe Homme',
        description: 'Coupe de cheveux moderne pour homme',
        price: 25,
        duration: 30,
        category: 'coupe',
        gender: 'homme',
        locationId: locations[1].id,
        isActive: true
      },
      {
        name: 'Coupe Femme',
        description: 'Coupe de cheveux élégante pour femme',
        price: 35,
        duration: 45,
        category: 'coupe',
        gender: 'femme',
        locationId: locations[1].id,
        isActive: true
      }
    ]);

    console.log(`✅ ${services.length} services créés`);

    // Créer un admin par défaut
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@barbershop-rennes.fr',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'Barbershop',
      role: 'super_admin',
      isActive: true
    });

    console.log('✅ Admin par défaut créé (username: admin, password: admin123)');

    console.log('🎉 Données de production initialisées avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation des données:', error);
    throw error;
  }
};

// Exécuter si appelé directement
if (require.main === module) {
  seedProductionData()
    .then(() => {
      console.log('✅ Initialisation terminée');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erreur:', error);
      process.exit(1);
    });
}

module.exports = seedProductionData;
