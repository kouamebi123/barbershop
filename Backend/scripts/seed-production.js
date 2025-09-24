const { Location, Service, Admin, Testimonial } = require('../models');
const bcrypt = require('bcryptjs');

const createTestimonialsOnly = async () => {
  try {
    // Récupérer les locations et services existants
    const locations = await Location.findAll();
    const services = await Service.findAll();
    
    if (locations.length === 0 || services.length === 0) {
      console.log('❌ Pas de locations ou services trouvés pour créer les témoignages');
      return;
    }
    
    // Créer des témoignages
    const testimonials = await Testimonial.bulkCreate([
      {
        customerName: 'Jean Dupont',
        customerEmail: 'jean.dupont@email.com',
        rating: 5,
        comment: 'Excellent service ! Le coiffeur était très professionnel et à l\'écoute. Je recommande vivement ce salon.',
        serviceId: services[0].id,
        locationId: locations[0].id,
        status: 'approved'
      },
      {
        customerName: 'Marie Martin',
        customerEmail: 'marie.martin@email.com',
        rating: 4,
        comment: 'Très bon accueil et coupe parfaite. L\'ambiance est détendue et le personnel sympathique.',
        serviceId: services[1] ? services[1].id : services[0].id,
        locationId: locations[0].id,
        status: 'approved'
      },
      {
        customerName: 'Pierre Durand',
        customerEmail: 'pierre.durand@email.com',
        rating: 5,
        comment: 'Service impeccable ! La taille de barbe est parfaite et le coiffeur prend le temps nécessaire.',
        serviceId: services[2] ? services[2].id : services[0].id,
        locationId: locations[1] ? locations[1].id : locations[0].id,
        status: 'approved'
      },
      {
        customerName: 'Sophie Leroy',
        customerEmail: 'sophie.leroy@email.com',
        rating: 4,
        comment: 'Belle expérience dans ce salon. L\'équipe est compétente et l\'environnement agréable.',
        serviceId: services[1] ? services[1].id : services[0].id,
        locationId: locations[1] ? locations[1].id : locations[0].id,
        status: 'approved'
      }
    ]);

    console.log(`✅ ${testimonials.length} témoignages créés`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des témoignages:', error);
    throw error;
  }
};

const seedProductionData = async () => {
  try {
    console.log('🌱 Initialisation des données de production...');

    // Vérifier si des données existent déjà
    const existingLocations = await Location.count();
    const existingTestimonials = await Testimonial.count();
    
    if (existingLocations > 0 && existingTestimonials > 0) {
      console.log('ℹ️  Des données existent déjà, arrêt de l\'initialisation');
      return;
    }
    
    if (existingLocations > 0 && existingTestimonials === 0) {
      console.log('ℹ️  Locations existent, création des témoignages seulement...');
      // Créer seulement les témoignages
      await createTestimonialsOnly();
      return;
    }

    // Créer des locations
    const locations = await Location.bulkCreate([
      {
        name: 'Barbershop Rennes Centre',
        address: '15 Rue de la Paix, 35000 Rennes',
        city: 'Rennes',
        postalCode: '35000',
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
        postalCode: '35000',
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

    // Créer des témoignages
    const testimonials = await Testimonial.bulkCreate([
      {
        customerName: 'Jean Dupont',
        customerEmail: 'jean.dupont@email.com',
        rating: 5,
        comment: 'Excellent service ! Le coiffeur était très professionnel et à l\'écoute. Je recommande vivement ce salon.',
        serviceId: services[0].id,
        locationId: locations[0].id,
        status: 'approved'
      },
      {
        customerName: 'Marie Martin',
        customerEmail: 'marie.martin@email.com',
        rating: 4,
        comment: 'Très bon accueil et coupe parfaite. L\'ambiance est détendue et le personnel sympathique.',
        serviceId: services[1].id,
        locationId: locations[0].id,
        status: 'approved'
      },
      {
        customerName: 'Pierre Durand',
        customerEmail: 'pierre.durand@email.com',
        rating: 5,
        comment: 'Service impeccable ! La taille de barbe est parfaite et le coiffeur prend le temps nécessaire.',
        serviceId: services[2].id,
        locationId: locations[1].id,
        status: 'approved'
      },
      {
        customerName: 'Sophie Leroy',
        customerEmail: 'sophie.leroy@email.com',
        rating: 4,
        comment: 'Belle expérience dans ce salon. L\'équipe est compétente et l\'environnement agréable.',
        serviceId: services[1].id,
        locationId: locations[1].id,
        status: 'approved'
      }
    ]);

    console.log(`✅ ${testimonials.length} témoignages créés`);

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
