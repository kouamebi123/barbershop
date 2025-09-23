const { sequelize } = require('../config/database');
const BaseController = require('./BaseController');
const Joi = require('joi');

class TestimonialControllerSimple extends BaseController {
  constructor() {
    super();
    
    // Schéma de validation pour la création d'un témoignage
    this.createSchema = Joi.object({
      customerName: Joi.string().min(2).max(100).required(),
      customerEmail: Joi.string().email().required(),
      rating: Joi.number().integer().min(1).max(5).required(),
      comment: Joi.string().min(10).max(1000).required(),
      serviceId: Joi.string().uuid().optional(),
      locationId: Joi.string().uuid().optional(),
      barberId: Joi.string().uuid().optional()
    });
  }

  /**
   * Récupérer tous les témoignages (public - seulement approuvés)
   */
  static async getAll(req, res) {
    try {
      console.log('🔍 [TestimonialControllerSimple] getAll - Starting...');

      // Requête simple sans pagination pour commencer
      const testimonialsQuery = `
        SELECT id, customer_name as "customerName", customer_email as "customerEmail", 
               rating, comment, service_id as "serviceId", location_id as "locationId", 
               barber_id as "barberId", status, created_at as "createdAt", updated_at as "updatedAt"
        FROM testimonials 
        WHERE status = 'approved' AND is_active = true
        ORDER BY created_at DESC
      `;

      const testimonials = await sequelize.query(testimonialsQuery, {
        type: sequelize.QueryTypes.SELECT
      });

      console.log('🔍 [TestimonialControllerSimple] getAll - Found testimonials:', testimonials.length);

      return BaseController.success(res, { testimonials }, 'Témoignages récupérés avec succès');

    } catch (error) {
      console.error('❌ [TestimonialControllerSimple] getAll - Error:', error);
      return BaseController.error(res, 'Erreur lors de la récupération des témoignages', 500, error);
    }
  }

  /**
   * Créer un nouveau témoignage
   */
  async create(req, res) {
    try {
      console.log('🔍 [TestimonialControllerSimple] create - Request body:', req.body);

      // Validation des données
      const { error, value } = this.createSchema.validate(req.body);
      if (error) {
        return BaseController.error(res, 'Données invalides', 400, error.details[0].message);
      }

      const { customerName, customerEmail, rating, comment, serviceId, locationId, barberId } = value;

      // Créer le témoignage avec des paramètres nommés
      const insertQuery = `
        INSERT INTO testimonials (customer_name, customer_email, rating, comment, service_id, location_id, barber_id, status, created_at, updated_at)
        VALUES (:customerName, :customerEmail, :rating, :comment, :serviceId, :locationId, :barberId, 'pending', NOW(), NOW())
        RETURNING id, customer_name as "customerName", customer_email as "customerEmail", 
                  rating, comment, service_id as "serviceId", location_id as "locationId", 
                  barber_id as "barberId", status, created_at as "createdAt", updated_at as "updatedAt"
      `;

      const replacements = {
        customerName,
        customerEmail,
        rating,
        comment,
        serviceId: serviceId || null,
        locationId: locationId || null,
        barberId: barberId || null
      };
      console.log('🔍 [TestimonialControllerSimple] create - Replacements:', replacements);

      const result = await sequelize.query(insertQuery, {
        replacements: replacements,
        type: sequelize.QueryTypes.SELECT
      });

      const testimonial = result[0];

      console.log('🔍 [TestimonialControllerSimple] create - Created testimonial:', testimonial.id);

      return BaseController.success(res, testimonial, 'Témoignage soumis avec succès. Il sera validé avant publication.');

    } catch (error) {
      console.error('❌ [TestimonialControllerSimple] create - Error:', error);
      return BaseController.error(res, 'Erreur lors de la création du témoignage', 500, error);
    }
  }
}

module.exports = TestimonialControllerSimple;