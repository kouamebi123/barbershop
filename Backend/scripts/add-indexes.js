const { sequelize } = require('../config/database');

const addIndexes = async () => {
  try {
    console.log('🔄 Ajout des index sur la table testimonials...');
    
    // Ajouter les index un par un
    const indexes = [
      {
        name: 'testimonials_status',
        sql: 'CREATE INDEX IF NOT EXISTS "testimonials_status" ON "testimonials" ("status");'
      },
      {
        name: 'testimonials_rating',
        sql: 'CREATE INDEX IF NOT EXISTS "testimonials_rating" ON "testimonials" ("rating");'
      },
      {
        name: 'testimonials_service_id',
        sql: 'CREATE INDEX IF NOT EXISTS "testimonials_service_id" ON "testimonials" ("serviceId");'
      },
      {
        name: 'testimonials_location_id',
        sql: 'CREATE INDEX IF NOT EXISTS "testimonials_location_id" ON "testimonials" ("locationId");'
      }
    ];
    
    for (const index of indexes) {
      try {
        await sequelize.query(index.sql);
        console.log(`✅ Index ${index.name} créé`);
      } catch (error) {
        console.log(`ℹ️  Index ${index.name} existe déjà ou erreur:`, error.message);
      }
    }
    
    console.log('✅ Tous les index ont été ajoutés');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des index:', error);
    throw error;
  }
};

module.exports = addIndexes;
