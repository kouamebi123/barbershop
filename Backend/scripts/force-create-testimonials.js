const { testConnection, sequelize } = require('../config/database');
const { Location, Service, Testimonial } = require('../models');

const forceCreateTestimonials = async () => {
  try {
    console.log('🚀 Création forcée des témoignages...');
    
    // Tester la connexion à la base de données
    await testConnection();
    
    // Synchroniser la base de données
    console.log('🔄 Synchronisation de la base de données...');
    await sequelize.sync({ alter: true });
    console.log('✅ Tables synchronisées');
    
    // Récupérer les locations et services existants
    const locations = await Location.findAll();
    const services = await Service.findAll();
    
    console.log(`📍 ${locations.length} locations trouvées`);
    console.log(`🔧 ${services.length} services trouvés`);
    
    if (locations.length === 0 || services.length === 0) {
      console.log('❌ Pas de locations ou services trouvés pour créer les témoignages');
      return;
    }
    
    // Supprimer tous les témoignages existants
    await Testimonial.destroy({ where: {} });
    console.log('🗑️  Témoignages existants supprimés');
    
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

    console.log(`✅ ${testimonials.length} témoignages créés avec succès !`);
    
    // Vérifier le nombre total
    const totalTestimonials = await Testimonial.count();
    console.log(`📊 Total de témoignages dans la base : ${totalTestimonials}`);
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des témoignages:', error);
    process.exit(1);
  }
};

forceCreateTestimonials();
