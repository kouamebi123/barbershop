const { Testimonial, Service, Location, Admin } = require('../models');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');
const Joi = require('joi');

class TestimonialController extends BaseController {
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
    });

    // Schéma de validation pour la mise à jour du statut
    this.updateStatusSchema = Joi.object({
      status: Joi.string().valid('pending', 'approved', 'rejected').required(),
      adminNotes: Joi.string().max(500).optional()
    });
  }

  /**
   * Récupérer tous les témoignages (public - seulement approuvés)
   */
  static async getAll(req, res) {
    try {
      const { page = 1, limit = 10, rating, serviceId, locationId } = req.query;
      const offset = (page - 1) * limit;

      console.log('🔍 [TestimonialController] getAll - Query params:', { page, limit, rating, serviceId, locationId });

      // Construire les conditions de recherche
      const whereConditions = { 
        status: 'approved',
        isActive: true 
      };
      
      if (rating) {
        whereConditions.rating = parseInt(rating);
      }
      
      if (serviceId) {
        whereConditions.serviceId = serviceId;
      }
      
      if (locationId) {
        whereConditions.locationId = locationId;
      }
      

      console.log('🔍 [TestimonialController] getAll - Where conditions:', whereConditions);

      const { count, rows: testimonials } = await Testimonial.findAndCountAll({
        where: whereConditions,
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      console.log('🔍 [TestimonialController] getAll - Found testimonials:', testimonials.length, 'out of', count);

      // Si pas de pagination demandée, retourner tous les témoignages
      if (!page || page == 1) {
        console.log('🔍 [TestimonialController] getAll - Returning response:', {
          testimonialsCount: testimonials.length
        });
        return BaseController.success(res, { testimonials }, 'Témoignages récupérés avec succès');
      }

      // Sinon, retourner avec pagination
      return BaseController.success(res, { 
        testimonials,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count
        }
      }, 'Témoignages récupérés avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des témoignages', 500, error);
    }
  }

  /**
   * Récupérer tous les témoignages (admin - tous les statuts)
   */
  static async getAllAdmin(req, res) {
    try {
      const { page = 1, limit = 10, status, rating, serviceId, locationId } = req.query;
      const offset = (page - 1) * limit;

      console.log('🔍 [TestimonialController] getAllAdmin - Query params:', { page, limit, status, rating, serviceId, locationId });

      // Construire les conditions de recherche
      const whereConditions = {};
      
      if (status) {
        whereConditions.status = status;
      }
      
      if (rating) {
        whereConditions.rating = parseInt(rating);
      }
      
      if (serviceId) {
        whereConditions.serviceId = serviceId;
      }
      
      if (locationId) {
        whereConditions.locationId = locationId;
      }
      

      console.log('🔍 [TestimonialController] getAllAdmin - Where conditions:', whereConditions);

      const { count, rows: testimonials } = await Testimonial.findAndCountAll({
        where: whereConditions,
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      console.log('🔍 [TestimonialController] getAllAdmin - Found testimonials:', testimonials.length, 'out of', count);

      return BaseController.success(res, { 
        testimonials,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count
        }
      }, 'Témoignages récupérés avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des témoignages', 500, error);
    }
  }

  /**
   * Créer un nouveau témoignage
   */
  async create(req, res) {
    try {
      console.log('🔍 [TestimonialController] create - Request body:', req.body);

      // Validation des données
      const { error, value } = this.createSchema.validate(req.body);
      if (error) {
        return BaseController.error(res, 'Données invalides', 400, error.details[0].message);
      }

      const { customerName, customerEmail, rating, comment, serviceId, locationId } = value;

      // Vérifier que les références existent si fournies
      if (serviceId) {
        const service = await Service.findByPk(serviceId);
        if (!service) {
          return BaseController.error(res, 'Service non trouvé', 404);
        }
      }

      if (locationId) {
        const location = await Location.findByPk(locationId);
        if (!location) {
          return BaseController.error(res, 'Location non trouvée', 404);
        }
      }


      // Créer le témoignage
      const testimonial = await Testimonial.create({
        customerName,
        customerEmail,
        rating,
        comment,
        serviceId: serviceId || null,
        locationId: locationId || null,
        status: 'pending'
      });

      console.log('🔍 [TestimonialController] create - Created testimonial:', testimonial.id);

      return BaseController.success(res, testimonial, 'Témoignage soumis avec succès. Il sera validé avant publication.');

    } catch (error) {
      console.error('❌ [TestimonialController] create - Error:', error);
      return BaseController.error(res, 'Erreur lors de la création du témoignage', 500, error);
    }
  }

  /**
   * Mettre à jour le statut d'un témoignage (admin)
   */
  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, adminNotes } = req.body;

      console.log('🔍 [TestimonialController] updateStatus - ID:', id, 'Status:', status);

      // Validation des données
      const { error, value } = this.updateStatusSchema.validate(req.body);
      if (error) {
        return BaseController.error(res, 'Données invalides', 400, error.details[0].message);
      }

      // Trouver le témoignage
      const testimonial = await Testimonial.findByPk(id);
      if (!testimonial) {
        return BaseController.error(res, 'Témoignage non trouvé', 404);
      }

      // Mettre à jour le statut
      const updateData = {
        status: value.status,
        adminNotes: value.adminNotes || null
      };

      if (value.status === 'approved') {
        updateData.verifiedAt = new Date();
        updateData.verifiedBy = req.user.id; // ID de l'admin connecté
      }

      await testimonial.update(updateData);

      console.log('🔍 [TestimonialController] updateStatus - Updated testimonial:', id, 'to status:', status);

      return BaseController.success(res, testimonial, 'Statut du témoignage mis à jour avec succès');

    } catch (error) {
      console.error('❌ [TestimonialController] updateStatus - Error:', error);
      return BaseController.error(res, 'Erreur lors de la mise à jour du statut', 500, error);
    }
  }

  /**
   * Supprimer un témoignage (admin)
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;

      console.log('🔍 [TestimonialController] delete - ID:', id);

      const testimonial = await Testimonial.findByPk(id);
      if (!testimonial) {
        return BaseController.error(res, 'Témoignage non trouvé', 404);
      }

      await testimonial.destroy();

      console.log('🔍 [TestimonialController] delete - Deleted testimonial:', id);

      return BaseController.success(res, null, 'Témoignage supprimé avec succès');

    } catch (error) {
      console.error('❌ [TestimonialController] delete - Error:', error);
      return BaseController.error(res, 'Erreur lors de la suppression du témoignage', 500, error);
    }
  }

  /**
   * Récupérer les statistiques des témoignages (admin)
   */
  static async getStats(req, res) {
    try {
      const [
        totalTestimonials,
        pendingTestimonials,
        approvedTestimonials,
        rejectedTestimonials,
        averageRating
      ] = await Promise.all([
        Testimonial.count(),
        Testimonial.count({ where: { status: 'pending' } }),
        Testimonial.count({ where: { status: 'approved' } }),
        Testimonial.count({ where: { status: 'rejected' } }),
        Testimonial.findAll({
          attributes: [
            [Testimonial.sequelize.fn('AVG', Testimonial.sequelize.col('rating')), 'averageRating']
          ],
          where: { status: 'approved' },
          raw: true
        })
      ]);

      const stats = {
        totalTestimonials,
        pendingTestimonials,
        approvedTestimonials,
        rejectedTestimonials,
        averageRating: averageRating[0]?.averageRating ? parseFloat(averageRating[0].averageRating).toFixed(1) : 0
      };

      console.log('🔍 [TestimonialController] getStats - Stats:', stats);

      return BaseController.success(res, stats, 'Statistiques des témoignages récupérées avec succès');

    } catch (error) {
      console.error('❌ [TestimonialController] getStats - Error:', error);
      return BaseController.error(res, 'Erreur lors de la récupération des statistiques', 500, error);
    }
  }
}

module.exports = TestimonialController;
