const { sequelize, Admin, Location, Barber, Service, Booking } = require('../models');

const updateDashboardData = async () => {
  try {
    console.log('🔄 Mise à jour des données du dashboard...');

    // Récupérer les statistiques réelles
    const totalLocations = await Location.count({ where: { isActive: true } });
    const totalBarbers = await Barber.count({ where: { isActive: true } });
    const totalServices = await Service.count({ where: { isActive: true } });
    const totalBookings = await Booking.count();
    const confirmedBookings = await Booking.count({ where: { status: 'confirmed' } });
    const cancelledBookings = await Booking.count({ where: { status: 'cancelled' } });

    // Récupérer les réservations des 30 derniers jours
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentBookings = await Booking.count({
      where: {
        createdAt: {
          [require('sequelize').Op.gte]: thirtyDaysAgo
        }
      }
    });

    // Récupérer le revenu total
    const totalRevenue = await Booking.sum('totalPrice', {
      where: { status: 'confirmed' }
    }) || 0;

    // Récupérer les coiffeurs les plus actifs
    const topBarbers = await Barber.findAll({
      include: [{
        model: Booking,
        as: 'bookings',
        where: { status: 'confirmed' },
        required: false
      }],
      order: [[{ model: Booking, as: 'bookings' }, 'id', 'DESC']],
      limit: 5
    });

    // Récupérer les services les plus populaires
    const topServices = await Service.findAll({
      include: [{
        model: Booking,
        as: 'bookings',
        where: { status: 'confirmed' },
        required: false
      }],
      order: [[{ model: Booking, as: 'bookings' }, 'id', 'DESC']],
      limit: 5
    });

    console.log('📊 Statistiques du dashboard:');
    console.log(`   - ${totalLocations} locations actives`);
    console.log(`   - ${totalBarbers} coiffeurs actifs`);
    console.log(`   - ${totalServices} services actifs`);
    console.log(`   - ${totalBookings} réservations totales`);
    console.log(`   - ${confirmedBookings} réservations confirmées`);
    console.log(`   - ${cancelledBookings} réservations annulées`);
    console.log(`   - ${recentBookings} réservations récentes (30 jours)`);
    console.log(`   - ${totalRevenue.toFixed(2)}€ de revenus totaux`);

    console.log('🎉 Dashboard mis à jour avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour du dashboard:', error);
  } finally {
    await sequelize.close();
  }
};

// Exécuter la mise à jour
updateDashboardData();
