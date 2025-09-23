const { sequelize, Admin, Location, Barber, Service, Booking } = require('../models');
const bcrypt = require('bcryptjs');

const seedData = async () => {
  try {
    console.log('🌱 Début du seeding des données...');

    // Vérifier si l'admin existe déjà
    let admin = await Admin.findOne({ where: { username: 'admin' } });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      admin = await Admin.create({
        username: 'admin',
        email: 'admin@barbershop-rennes.fr',
        password: hashedPassword,
        firstName: 'Admin',
        lastName: 'Principal',
        role: 'super_admin',
        isActive: true,
        permissions: {
          manageBookings: true,
          manageBarbers: true,
          manageServices: true,
          manageLocations: true,
          manageAdmins: true,
          viewAnalytics: true
        }
      });
      console.log('✅ Admin créé:', admin.email);
    } else {
      console.log('✅ Admin existe déjà:', admin.email);
    }

    // Vérifier si les locations existent déjà
    let locations = await Location.findAll();
    if (locations.length === 0) {
      locations = await Location.bulkCreate([
      {
        name: 'Salon Centre-Ville',
        address: '12 Rue de la Barbe',
        city: 'Rennes',
        postalCode: '35000',
        phone: '+33 2 99 12 34 56',
        email: 'centre@barbershop-rennes.fr',
        latitude: 48.1173,
        longitude: -1.6778,
        openingHours: {
          monday: { open: '09:00', close: '19:00' },
          tuesday: { open: '09:00', close: '19:00' },
          wednesday: { open: '09:00', close: '19:00' },
          thursday: { open: '09:00', close: '19:00' },
          friday: { open: '09:00', close: '20:00' },
          saturday: { open: '08:00', close: '18:00' },
          sunday: { open: null, close: null }
        },
        isActive: true,
        parking: true,
        wifi: true,
        coffee: true,
        accessibility: true
      },
      {
        name: 'Salon Nord',
        address: '45 Avenue de Bretagne',
        city: 'Rennes',
        postalCode: '35000',
        phone: '+33 2 99 23 45 67',
        email: 'nord@barbershop-rennes.fr',
        latitude: 48.1300,
        longitude: -1.6800,
        openingHours: {
          monday: { open: '09:00', close: '19:00' },
          tuesday: { open: '09:00', close: '19:00' },
          wednesday: { open: '09:00', close: '19:00' },
          thursday: { open: '09:00', close: '19:00' },
          friday: { open: '09:00', close: '20:00' },
          saturday: { open: '08:00', close: '18:00' },
          sunday: { open: null, close: null }
        },
        isActive: true,
        parking: true,
        wifi: true,
        coffee: true,
        accessibility: false
      },
      {
        name: 'Salon Sud',
        address: '78 Rue de Nantes',
        city: 'Rennes',
        postalCode: '35000',
        phone: '+33 2 99 34 56 78',
        email: 'sud@barbershop-rennes.fr',
        latitude: 48.1000,
        longitude: -1.6700,
        openingHours: {
          monday: { open: '09:00', close: '19:00' },
          tuesday: { open: '09:00', close: '19:00' },
          wednesday: { open: '09:00', close: '19:00' },
          thursday: { open: '09:00', close: '19:00' },
          friday: { open: '09:00', close: '20:00' },
          saturday: { open: '08:00', close: '18:00' },
          sunday: { open: null, close: null }
        },
        isActive: true,
        parking: false,
        wifi: true,
        coffee: true,
        accessibility: true
      }
      ]);
      console.log('✅ Locations créées:', locations.length);
    } else {
      console.log('✅ Locations existent déjà:', locations.length);
    }

    // Vérifier si les coiffeurs existent déjà
    let barbers = await Barber.findAll();
    if (barbers.length === 0) {
      barbers = await Barber.bulkCreate([
      {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@barbershop-rennes.fr',
        phone: '+33 6 12 34 56 78',
        specialization: 'Coupe classique et moderne',
        experience: 8,
        bio: 'Spécialiste des coupes classiques et modernes avec 8 ans d\'expérience. Passionné par l\'art de la coiffure masculine.',
        isActive: true,
        workingHours: {
          monday: { start: '09:00', end: '19:00' },
          tuesday: { start: '09:00', end: '19:00' },
          wednesday: { start: '09:00', end: '19:00' },
          thursday: { start: '09:00', end: '19:00' },
          friday: { start: '09:00', end: '20:00' },
          saturday: { start: '08:00', end: '18:00' },
          sunday: { start: null, end: null }
        },
        rating: 4.8,
        totalBookings: 0,
        imageUrl: null
      },
      {
        firstName: 'Pierre',
        lastName: 'Martin',
        email: 'pierre.martin@barbershop-rennes.fr',
        phone: '+33 6 23 45 67 89',
        specialization: 'Taille de barbe et rasage',
        experience: 12,
        bio: 'Expert en taille de barbe et rasage traditionnel. Maîtrise parfaite des techniques de rasage à l\'ancienne.',
        isActive: true,
        workingHours: {
          monday: { start: '09:00', end: '19:00' },
          tuesday: { start: '09:00', end: '19:00' },
          wednesday: { start: '09:00', end: '19:00' },
          thursday: { start: '09:00', end: '19:00' },
          friday: { start: '09:00', end: '20:00' },
          saturday: { start: '08:00', end: '18:00' },
          sunday: { start: null, end: null }
        },
        rating: 4.9,
        totalBookings: 0,
        imageUrl: null
      },
      {
        firstName: 'Marc',
        lastName: 'Bernard',
        email: 'marc.bernard@barbershop-rennes.fr',
        phone: '+33 6 34 56 78 90',
        specialization: 'Coupe tendance et coloration',
        experience: 6,
        bio: 'Spécialiste des coupes tendance et de la coloration masculine. Toujours à la pointe des dernières tendances.',
        isActive: true,
        workingHours: {
          monday: { start: '09:00', end: '19:00' },
          tuesday: { start: '09:00', end: '19:00' },
          wednesday: { start: '09:00', end: '19:00' },
          thursday: { start: '09:00', end: '19:00' },
          friday: { start: '09:00', end: '20:00' },
          saturday: { start: '08:00', end: '18:00' },
          sunday: { start: null, end: null }
        },
        rating: 4.7,
        totalBookings: 0,
        imageUrl: null
      }
      ]);
      console.log('✅ Coiffeurs créés:', barbers.length);
    } else {
      console.log('✅ Coiffeurs existent déjà:', barbers.length);
    }

    // Associer les coiffeurs aux locations
    await barbers[0].addLocation(locations[0]); // Jean au salon centre
    await barbers[0].addLocation(locations[1]); // Jean au salon nord
    await barbers[1].addLocation(locations[0]); // Pierre au salon centre
    await barbers[1].addLocation(locations[2]); // Pierre au salon sud
    await barbers[2].addLocation(locations[1]); // Marc au salon nord
    await barbers[2].addLocation(locations[2]); // Marc au salon sud

    // Vérifier si les services existent déjà
    let services = await Service.findAll();
    if (services.length === 0) {
      services = await Service.bulkCreate([
      {
        name: 'Coupe de cheveux',
        description: 'Coupe de cheveux moderne et personnalisée selon votre style',
        price: 25.00,
        duration: 30,
        category: 'coupe',
        isActive: true,
        imageUrl: null,
        maxConcurrentBookings: 1
      },
      {
        name: 'Taille de barbe',
        description: 'Taille de barbe précise et soignée avec des outils professionnels',
        price: 20.00,
        duration: 25,
        category: 'barbe',
        isActive: true,
        imageUrl: null,
        maxConcurrentBookings: 1
      },
      {
        name: 'Rasage traditionnel',
        description: 'Rasage à l\'ancienne avec blaireau et savon à barbe',
        price: 30.00,
        duration: 40,
        category: 'barbe',
        isActive: true,
        imageUrl: null,
        maxConcurrentBookings: 1
      },
      {
        name: 'Coupe + Barbe',
        description: 'Package complet : coupe de cheveux et taille de barbe',
        price: 40.00,
        duration: 50,
        category: 'combo',
        isActive: true,
        imageUrl: null,
        maxConcurrentBookings: 1
      },
      {
        name: 'Soins du visage',
        description: 'Soins relaxants pour une peau saine et éclatante',
        price: 35.00,
        duration: 45,
        category: 'soins',
        isActive: true,
        imageUrl: null,
        maxConcurrentBookings: 1
      },
      {
        name: 'Coloration',
        description: 'Coloration capillaire masculine naturelle ou tendance',
        price: 45.00,
        duration: 60,
        category: 'coloration',
        isActive: true,
        imageUrl: null,
        maxConcurrentBookings: 1
      }
      ]);
      console.log('✅ Services créés:', services.length);
    } else {
      console.log('✅ Services existent déjà:', services.length);
    }

    // Associer les services aux locations
    for (const location of locations) {
      for (const service of services) {
        await service.setLocation(location);
      }
    }

    console.log('🎉 Seeding terminé avec succès !');
    console.log(`📊 Données créées:`);
    console.log(`   - ${locations.length} locations`);
    console.log(`   - ${barbers.length} coiffeurs`);
    console.log(`   - ${services.length} services`);
    console.log(`   - 1 admin`);

  } catch (error) {
    console.error('❌ Erreur lors du seeding:', error);
  } finally {
    await sequelize.close();
  }
};

// Exécuter le seeding
seedData();
