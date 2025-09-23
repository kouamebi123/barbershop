const { sequelize } = require('../config/database');

async function createTestimonialsTable() {
  try {
    console.log('🔍 Création de la table testimonials...');
    
    // Créer la table directement avec SQL
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        customer_name VARCHAR(100) NOT NULL CHECK (LENGTH(customer_name) >= 2 AND LENGTH(customer_name) <= 100),
        customer_email VARCHAR(255) NOT NULL CHECK (customer_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'),
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        comment TEXT NOT NULL CHECK (LENGTH(comment) >= 10 AND LENGTH(comment) <= 1000),
        service_id UUID REFERENCES services(id) ON DELETE SET NULL,
        location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
        barber_id UUID REFERENCES barbers(id) ON DELETE SET NULL,
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        is_active BOOLEAN DEFAULT true NOT NULL,
        admin_notes TEXT,
        verified_at TIMESTAMP,
        verified_by UUID REFERENCES admins(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      )
    `);
    
    console.log('✅ Table testimonials créée avec succès');
    
    // Créer les index
    await sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
      CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);
      CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);
      CREATE INDEX IF NOT EXISTS idx_testimonials_service_id ON testimonials(service_id);
      CREATE INDEX IF NOT EXISTS idx_testimonials_location_id ON testimonials(location_id);
      CREATE INDEX IF NOT EXISTS idx_testimonials_barber_id ON testimonials(barber_id);
    `);
    
    console.log('✅ Index créés avec succès');
    
    // Vérifier que la table existe
    const [results] = await sequelize.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'testimonials'
    `);
    
    if (results.length > 0) {
      console.log('✅ Table testimonials confirmée dans la base de données');
    } else {
      console.log('❌ Table testimonials non trouvée');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la création de la table testimonials:', error);
  } finally {
    await sequelize.close();
  }
}

createTestimonialsTable();