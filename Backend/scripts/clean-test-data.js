const { sequelize, Admin, Location, Barber, Service, Booking } = require('../models');

const cleanTestData = async () => {
  try {
    console.log('🧹 Début du nettoyage des données de test...');

    // Supprimer toutes les réservations
    const deletedBookings = await Booking.destroy({ where: {} });
    console.log(`✅ ${deletedBookings} réservations supprimées`);

    // Supprimer tous les services
    const deletedServices = await Service.destroy({ where: {} });
    console.log(`✅ ${deletedServices} services supprimés`);

    // Supprimer tous les coiffeurs
    const deletedBarbers = await Barber.destroy({ where: {} });
    console.log(`✅ ${deletedBarbers} coiffeurs supprimés`);

    // Supprimer toutes les locations
    const deletedLocations = await Location.destroy({ where: {} });
    console.log(`✅ ${deletedLocations} locations supprimées`);

    // Supprimer tous les admins sauf le premier
    const admins = await Admin.findAll();
    if (admins.length > 1) {
      const adminsToDelete = admins.slice(1);
      for (const admin of adminsToDelete) {
        await admin.destroy();
      }
      console.log(`✅ ${adminsToDelete.length} admins supprimés`);
    }

    console.log('🎉 Nettoyage terminé avec succès !');
    console.log('📊 Données supprimées:');
    console.log(`   - ${deletedBookings} réservations`);
    console.log(`   - ${deletedServices} services`);
    console.log(`   - ${deletedBarbers} coiffeurs`);
    console.log(`   - ${deletedLocations} locations`);

  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
  } finally {
    await sequelize.close();
  }
};

// Exécuter le nettoyage
cleanTestData();
