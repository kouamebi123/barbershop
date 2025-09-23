const { sequelize } = require('../config/database');
const { Location, Service, Booking, Admin } = require('../models');
const Testimonial = require('../models/Testimonial')(sequelize);

async function cleanAndMigrate() {
  try {
    console.log('🧹 Nettoyage de la base de données...');
    
    // Supprimer toutes les tables dans l'ordre inverse des dépendances
    await sequelize.query('DROP TABLE IF EXISTS "booking_services" CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS "bookings" CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS "testimonials" CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS "services" CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS "locations" CASCADE;');
    await sequelize.query('DROP TABLE IF EXISTS "admins" CASCADE;');
    
    console.log('✅ Tables supprimées');
    
    // Synchroniser les modèles pour recréer les tables
    console.log('🔄 Synchronisation des modèles...');
    await sequelize.sync({ force: true });
    console.log('✅ Tables recréées');
    
    // Peupler la base de données
    console.log('🌱 Peuplement de la base de données...');
    
    // 1. Créer les administrateurs
    const admin = await Admin.create({
      username: 'admin',
      firstName: 'Admin',
      lastName: 'System',
      email: 'admin@barbershop.com',
      password: '$2b$10$rQZ8K9vL2mN3pQ4rS5tU6uV7wX8yZ9aA0bB1cC2dD3eE4fF5gG6hH7iI8jJ9kK0lL1mM2nN3oO4pP5qQ6rR7sS8tT9uU0vV1wW2xX3yY4zZ5',
      role: 'super_admin',
      isActive: true
    });
    console.log('✅ Administrateur créé');
    
    // 2. Créer les salons
    const locations = await Location.bulkCreate([
      {
        name: 'Salon Centre-Ville',
        address: '123 Rue de la Paix',
        city: 'Rennes',
        postalCode: '35000',
        phone: '02 99 12 34 56',
        email: 'centre@barbershop.com',
        supported_genders: ['homme', 'femme'],
        isActive: true,
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
        name: 'Salon Quartier Nord',
        address: '456 Avenue des Champs',
        city: 'Rennes',
        postalCode: '35000',
        phone: '02 99 12 34 57',
        email: 'nord@barbershop.com',
        supported_genders: ['homme', 'femme'],
        isActive: true,
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
    console.log(`✅ ${locations.length} salons créés`);
    
    // 3. Créer les services
    const services = await Service.bulkCreate([
      // Services Homme
      {
        name: 'Coupe Homme Classique',
        description: 'Coupe traditionnelle pour homme',
        price: 25.00,
        duration: 30,
        category: 'coupe',
        gender: 'homme',
        haircut_type: 'coupe_homme',
        isActive: true,
        maxConcurrentBookings: 3
      },
      {
        name: 'Coupe Homme Moderne',
        description: 'Coupe tendance pour homme',
        price: 35.00,
        duration: 45,
        category: 'coupe',
        gender: 'homme',
        haircut_type: 'coupe_homme',
        isActive: true,
        maxConcurrentBookings: 2
      },
      {
        name: 'Taille de Barbe',
        description: 'Taille et entretien de la barbe',
        price: 20.00,
        duration: 25,
        category: 'barbe',
        gender: 'homme',
        haircut_type: 'barbe',
        isActive: true,
        maxConcurrentBookings: 2
      },
      {
        name: 'Rasage Complet',
        description: 'Rasage traditionnel au coupe-chou',
        price: 30.00,
        duration: 35,
        category: 'barbe',
        gender: 'homme',
        haircut_type: 'barbe',
        isActive: true,
        maxConcurrentBookings: 1
      },
      
      // Services Femme
      {
        name: 'Coupe Femme Courte',
        description: 'Coupe courte moderne pour femme',
        price: 40.00,
        duration: 60,
        category: 'coupe',
        gender: 'femme',
        haircut_type: 'coupe_femme',
        isActive: true,
        maxConcurrentBookings: 2
      },
      {
        name: 'Coupe Femme Longue',
        description: 'Coupe et coiffage pour cheveux longs',
        price: 50.00,
        duration: 75,
        category: 'coupe',
        gender: 'femme',
        haircut_type: 'coupe_femme',
        isActive: true,
        maxConcurrentBookings: 1
      },
      {
        name: 'Coloration Femme',
        description: 'Coloration complète des cheveux',
        price: 80.00,
        duration: 120,
        category: 'coloration',
        gender: 'femme',
        haircut_type: 'coloration',
        isActive: true,
        maxConcurrentBookings: 1
      },
      
      // Services Unisex
      {
        name: 'Shampoing & Soin',
        description: 'Shampoing et soin capillaire',
        price: 15.00,
        duration: 30,
        category: 'soins',
        gender: 'unisex',
        haircut_type: 'soin',
        isActive: true,
        maxConcurrentBookings: 4
      },
      {
        name: 'Brushing',
        description: 'Séchage et coiffage',
        price: 20.00,
        duration: 25,
        category: 'soins',
        gender: 'unisex',
        haircut_type: 'soin',
        isActive: true,
        maxConcurrentBookings: 3
      }
    ]);
    console.log(`✅ ${services.length} services créés`);
    
    // 4. Créer quelques témoignages
    const testimonial1 = await Testimonial.create({
      customerName: 'Marie Dubois',
      customerEmail: 'marie.dubois@email.com',
      rating: 5,
      comment: 'Excellent service, très professionnel !',
      status: 'approved',
      isVerified: true
    });
    
    const testimonial2 = await Testimonial.create({
      customerName: 'Pierre Martin',
      customerEmail: 'pierre.martin@email.com',
      rating: 4,
      comment: 'Très satisfait de ma coupe, je recommande !',
      status: 'approved',
      isVerified: true
    });
    
    const testimonial3 = await Testimonial.create({
      customerName: 'Sophie Leroy',
      customerEmail: 'sophie.leroy@email.com',
      rating: 5,
      comment: 'Personnel très accueillant et compétent.',
      status: 'approved',
      isVerified: true
    });
    
    console.log('✅ 3 témoignages créés');
    
    console.log('🎉 Base de données nettoyée et repeuplée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage et du peuplement:', error);
    throw error;
  } finally {
    await sequelize.close();
  }
}

// Exécuter le script
cleanAndMigrate()
  .then(() => {
    console.log('✅ Script terminé avec succès');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erreur:', error);
    process.exit(1);
  });
