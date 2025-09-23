const { sequelize } = require('../models');

const resetDatabase = async () => {
  try {
    console.log('🔄 Réinitialisation de la base de données...');

    // Supprimer toutes les tables
    await sequelize.drop();
    console.log('✅ Toutes les tables supprimées');

    // Recréer toutes les tables
    await sequelize.sync({ force: true });
    console.log('✅ Toutes les tables recréées');

    console.log('🎉 Base de données réinitialisée avec succès !');

  } catch (error) {
    console.error('❌ Erreur lors de la réinitialisation:', error);
  } finally {
    await sequelize.close();
  }
};

// Exécuter la réinitialisation
resetDatabase();
