const { sequelize, testConnection } = require('../config/database');
const { Location, Service, Barber, Booking, Admin, BarberLocation, BookingService } = require('../models');

const migrate = async () => {
  try {
    console.log('🔄 Début de la migration de la base de données...');
    
    // Tester la connexion
    await testConnection();
    
    // Synchroniser les modèles avec la base de données
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Modèles synchronisés avec la base de données');
    
    // Créer les données de test si elles n'existent pas
    await seedData();
    
    console.log('🎉 Migration terminée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
};

const seedData = async () => {
  try {
    console.log('🌱 Création des données de test...');
    
    // Vérifier si des données existent déjà
    const existingLocations = await Location.count();
    if (existingLocations > 0) {
      console.log('📊 Données existantes détectées, pas de seed nécessaire');
      return;
    }
    
    // Créer les locations
    const locations = await Location.bulkCreate([
      {
        name: 'Barbershop Centre',
        address: '15 Rue de la Soif, 35000 Rennes',
        city: 'Rennes',
        postalCode: '35000',
        latitude: 48.1173,
        longitude: -1.6778,
        phone: '+33 2 99 12 34 56',
        email: 'centre@barbershop-rennes.fr',
        description: 'Notre salon principal au cœur de Rennes',
        openingHours: {
          monday: { open: '09:00', close: '19:00', closed: false },
          tuesday: { open: '09:00', close: '19:00', closed: false },
          wednesday: { open: '09:00', close: '19:00', closed: false },
          thursday: { open: '09:00', close: '19:00', closed: false },
          friday: { open: '09:00', close: '19:00', closed: false },
          saturday: { open: '09:00', close: '18:00', closed: false },
          sunday: { open: '10:00', close: '16:00', closed: true }
        }
      },
      {
        name: 'Barbershop Nord',
        address: '42 Avenue de Bretagne, 35000 Rennes',
        city: 'Rennes',
        postalCode: '35000',
        latitude: 48.1300,
        longitude: -1.6800,
        phone: '+33 2 99 12 34 57',
        email: 'nord@barbershop-rennes.fr',
        description: 'Notre salon du quartier nord',
        openingHours: {
          monday: { open: '09:00', close: '19:00', closed: false },
          tuesday: { open: '09:00', close: '19:00', closed: false },
          wednesday: { open: '09:00', close: '19:00', closed: false },
          thursday: { open: '09:00', close: '19:00', closed: false },
          friday: { open: '09:00', close: '19:00', closed: false },
          saturday: { open: '09:00', close: '18:00', closed: false },
          sunday: { open: '10:00', close: '16:00', closed: true }
        }
      }
    ]);
    
    console.log(`✅ ${locations.length} locations créées`);
    
    // Créer les coiffeurs
    const barbers = await Barber.bulkCreate([
      {
        firstName: 'Marc',
        lastName: 'Dubois',
        email: 'marc.dubois@barbershop-rennes.fr',
        phone: '+33 6 12 34 56 78',
        specializations: ['Coupe moderne', 'Taille de barbe', 'Rasage traditionnel'],
        experience: 8,
        bio: 'Spécialiste des coupes modernes et du rasage traditionnel. 8 ans d\'expérience.',
        rating: 4.8,
        totalBookings: 0,
        workingHours: {
          monday: { start: '09:00', end: '19:00', working: true },
          tuesday: { start: '09:00', end: '19:00', working: true },
          wednesday: { start: '09:00', end: '19:00', working: true },
          thursday: { start: '09:00', end: '19:00', working: true },
          friday: { start: '09:00', end: '19:00', working: true },
          saturday: { start: '09:00', end: '18:00', working: true },
          sunday: { start: '10:00', end: '16:00', working: false }
        }
      },
      {
        firstName: 'Thomas',
        lastName: 'Martin',
        email: 'thomas.martin@barbershop-rennes.fr',
        phone: '+33 6 12 34 56 79',
        specializations: ['Coupe classique', 'Soins du visage', 'Coloration'],
        experience: 5,
        bio: 'Expert en coupes classiques et soins du visage. Attention particulière aux détails.',
        rating: 4.6,
        totalBookings: 0,
        workingHours: {
          monday: { start: '09:00', end: '19:00', working: true },
          tuesday: { start: '09:00', end: '19:00', working: true },
          wednesday: { start: '09:00', end: '19:00', working: true },
          thursday: { start: '09:00', end: '19:00', working: true },
          friday: { start: '09:00', end: '19:00', working: true },
          saturday: { start: '09:00', end: '18:00', working: true },
          sunday: { start: '10:00', end: '16:00', working: false }
        }
      },
      {
        firstName: 'Julien',
        lastName: 'Roux',
        email: 'julien.roux@barbershop-rennes.fr',
        phone: '+33 6 12 34 56 80',
        specializations: ['Coupe moderne', 'Coupe enfant', 'Coiffure événement'],
        experience: 6,
        bio: 'Spécialiste des coupes modernes et créatives. Parfait pour les événements spéciaux.',
        rating: 4.7,
        totalBookings: 0,
        workingHours: {
          monday: { start: '10:00', end: '19:00', working: true },
          tuesday: { start: '10:00', end: '19:00', working: true },
          wednesday: { start: '10:00', end: '19:00', working: true },
          thursday: { start: '10:00', end: '19:00', working: true },
          friday: { start: '10:00', end: '19:00', working: true },
          saturday: { start: '09:00', end: '18:00', working: true },
          sunday: { start: '10:00', end: '16:00', working: false }
        }
      }
    ]);
    
    console.log(`✅ ${barbers.length} coiffeurs créés`);
    
    // Associer les coiffeurs aux locations
    await locations[0].addBarbers([barbers[0], barbers[1]]);
    await locations[1].addBarbers([barbers[1], barbers[2]]);
    
    console.log('✅ Coiffeurs associés aux locations');
    
    // Créer les services
    const services = await Service.bulkCreate([
      // Services Centre
      {
        name: 'Coupe Homme Classique',
        description: 'Coupe traditionnelle avec tondeuse et ciseaux',
        price: 25.00,
        duration: 30,
        category: 'coupe',
        locationId: locations[0].id,
        requiresBarber: true
      },
      {
        name: 'Coupe Homme Moderne',
        description: 'Coupe tendance avec dégradé et finitions précises',
        price: 35.00,
        duration: 45,
        category: 'coupe',
        locationId: locations[0].id,
        requiresBarber: true
      },
      {
        name: 'Taille de Barbe',
        description: 'Taille et entretien de la barbe avec tondeuse',
        price: 20.00,
        duration: 25,
        category: 'barbe',
        locationId: locations[0].id,
        requiresBarber: true
      },
      {
        name: 'Rasage Traditionnel',
        description: 'Rasage au coupe-chou avec serviette chaude',
        price: 30.00,
        duration: 40,
        category: 'barbe',
        locationId: locations[0].id,
        requiresBarber: true
      },
      {
        name: 'Coupe + Barbe',
        description: 'Forfait coupe de cheveux + taille de barbe',
        price: 45.00,
        duration: 60,
        category: 'combo',
        locationId: locations[0].id,
        requiresBarber: true
      },
      {
        name: 'Soin du Visage',
        description: 'Nettoyage et soin du visage complet',
        price: 40.00,
        duration: 50,
        category: 'soins',
        locationId: locations[0].id,
        requiresBarber: true
      },
      
      // Services Nord
      {
        name: 'Coupe Homme Classique',
        description: 'Coupe traditionnelle avec tondeuse et ciseaux',
        price: 25.00,
        duration: 30,
        category: 'coupe',
        locationId: locations[1].id,
        requiresBarber: true
      },
      {
        name: 'Coupe Homme Moderne',
        description: 'Coupe tendance avec dégradé et finitions précises',
        price: 35.00,
        duration: 45,
        category: 'coupe',
        locationId: locations[1].id,
        requiresBarber: true
      },
      {
        name: 'Taille de Barbe',
        description: 'Taille et entretien de la barbe avec tondeuse',
        price: 20.00,
        duration: 25,
        category: 'barbe',
        locationId: locations[1].id,
        requiresBarber: true
      },
      {
        name: 'Rasage Traditionnel',
        description: 'Rasage au coupe-chou avec serviette chaude',
        price: 30.00,
        duration: 40,
        category: 'barbe',
        locationId: locations[1].id,
        requiresBarber: true
      },
      {
        name: 'Coupe + Barbe',
        description: 'Forfait coupe de cheveux + taille de barbe',
        price: 45.00,
        duration: 60,
        category: 'combo',
        locationId: locations[1].id,
        requiresBarber: true
      },
      {
        name: 'Soin du Visage',
        description: 'Nettoyage et soin du visage complet',
        price: 40.00,
        duration: 50,
        category: 'soins',
        locationId: locations[1].id,
        requiresBarber: true
      }
    ]);
    
    console.log(`✅ ${services.length} services créés`);
    
    // Créer un admin par défaut
    const admin = await Admin.create({
      username: 'admin',
      email: 'admin@barbershop-rennes.fr',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'Barbershop',
      role: 'super_admin',
      permissions: {
        manageBookings: true,
        manageLocations: true,
        manageServices: true,
        manageBarbers: true,
        viewAnalytics: true,
        manageAdmins: true
      }
    });
    
    console.log('✅ Admin par défaut créé (admin@barbershop-rennes.fr / admin123)');
    
    console.log('🎉 Données de test créées avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des données de test:', error);
    throw error;
  }
};

// Exécuter la migration si le script est appelé directement
if (require.main === module) {
  migrate();
}

module.exports = { migrate, seedData };
