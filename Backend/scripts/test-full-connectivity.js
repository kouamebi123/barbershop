const { sequelize, Location, Barber, Service, Booking, Admin } = require('../models');

const testFullConnectivity = async () => {
  try {
    console.log('🔍 Test de connectivité complet...\n');

    // Test 1: Vérifier les locations avec leurs services
    console.log('📍 TEST 1: Locations et Services');
    const locations = await Location.findAll({
      include: [{
        model: Service,
        as: 'services',
        where: { isActive: true },
        required: false
      }]
    });

    locations.forEach(location => {
      console.log(`   ${location.name}: ${location.services.length} services`);
      location.services.forEach(service => {
        console.log(`     - ${service.name} (${service.price}€, ${service.duration}min)`);
      });
    });

    // Test 2: Vérifier les coiffeurs avec leurs locations
    console.log('\n👨‍💼 TEST 2: Coiffeurs et Locations');
    const barbers = await Barber.findAll({
      include: [{
        model: Location,
        as: 'locations',
        where: { isActive: true },
        required: false
      }]
    });

    barbers.forEach(barber => {
      console.log(`   ${barber.firstName} ${barber.lastName}: ${barber.locations.length} locations`);
      barber.locations.forEach(location => {
        console.log(`     - ${location.name}`);
      });
    });

    // Test 3: Vérifier les services par catégorie
    console.log('\n✂️ TEST 3: Services par Catégorie');
    const servicesByCategory = await Service.findAll({
      where: { isActive: true },
      group: ['category'],
      attributes: ['category', [sequelize.fn('COUNT', sequelize.col('id')), 'count']]
    });

    servicesByCategory.forEach(item => {
      console.log(`   ${item.category}: ${item.dataValues.count} services`);
    });

    // Test 4: Vérifier les statistiques globales
    console.log('\n📊 TEST 4: Statistiques Globales');
    const stats = {
      locations: await Location.count({ where: { isActive: true } }),
      barbers: await Barber.count({ where: { isActive: true } }),
      services: await Service.count({ where: { isActive: true } }),
      bookings: await Booking.count(),
      admins: await Admin.count()
    };

    Object.entries(stats).forEach(([key, value]) => {
      console.log(`   ${key}: ${value}`);
    });

    // Test 5: Vérifier les horaires d'ouverture
    console.log('\n🕒 TEST 5: Horaires d\'Ouverture');
    locations.forEach(location => {
      console.log(`   ${location.name}:`);
      if (location.openingHours) {
        Object.entries(location.openingHours).forEach(([day, hours]) => {
          const dayName = {
            monday: 'Lundi',
            tuesday: 'Mardi',
            wednesday: 'Mercredi',
            thursday: 'Jeudi',
            friday: 'Vendredi',
            saturday: 'Samedi',
            sunday: 'Dimanche'
          }[day] || day;
          
          const timeStr = hours.closed ? 'Fermé' : `${hours.open} - ${hours.close}`;
          console.log(`     ${dayName}: ${timeStr}`);
        });
      }
    });

    console.log('\n✅ Test de connectivité terminé avec succès !');
    console.log('\n📋 RÉSUMÉ:');
    console.log(`   - ${stats.locations} locations actives`);
    console.log(`   - ${stats.barbers} coiffeurs actifs`);
    console.log(`   - ${stats.services} services actifs`);
    console.log(`   - ${stats.bookings} réservations`);
    console.log(`   - ${stats.admins} administrateurs`);

  } catch (error) {
    console.error('❌ Erreur lors du test de connectivité:', error);
  } finally {
    await sequelize.close();
  }
};

// Exécuter le test
testFullConnectivity();
