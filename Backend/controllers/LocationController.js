const { Location, Service } = require('../models');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');

class LocationController extends BaseController {
  /**
   * Récupérer toutes les locations
   */
  static async getAll(req, res) {
    try {
      const { page = 1, limit = 10, search, city, isActive } = req.query;
      const offset = (page - 1) * limit;

      console.log('🔍 [LocationController] getAll - Query params:', { page, limit, search, city, isActive });

      // Construire les conditions de recherche
      const whereConditions = {};
      
      if (isActive !== undefined) {
        whereConditions.isActive = isActive === 'true';
      }
      
      if (city) {
        whereConditions.city = { [Op.iLike]: `%${city}%` };
      }
      
      if (search) {
        whereConditions[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { address: { [Op.iLike]: `%${search}%` } },
          { city: { [Op.iLike]: `%${search}%` } }
        ];
      }
      
      console.log('🔍 [LocationController] getAll - Where conditions:', whereConditions);

      const { count, rows: locations } = await Location.findAndCountAll({
        where: whereConditions,
        include: [
          {
            model: Service,
            as: 'services',
            where: { isActive: true },
            required: false
          }
        ],
        order: [['name', 'ASC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      console.log('🔍 [LocationController] getAll - Found locations:', locations.length, 'out of', count);
      console.log('🔍 [LocationController] getAll - First location:', locations[0] ? {
        id: locations[0].id,
        name: locations[0].name,
        isActive: locations[0].isActive,
        servicesCount: locations[0].services ? locations[0].services.length : 0
      } : 'No locations found');

      // Si pas de pagination demandée, retourner toutes les locations
      if (!page || page == 1) {
        console.log('🔍 [LocationController] getAll - Returning response:', {
          locationsCount: locations.length
        });
        return BaseController.success(res, { locations }, 'Locations récupérées avec succès');
      }

      // Sinon, retourner avec pagination
      return this.paginated(res, locations, {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count
      }, 'Locations récupérées avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des locations', 500, error);
    }
  }

  /**
   * Récupérer une location par ID
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const location = await Location.findByPk(id, {
        include: [
          {
            model: Service,
            as: 'services',
            where: { isActive: true },
            required: false
          }
        ]
      });

      if (!location) {
        return this.notFound(res, 'Location');
      }

      return BaseController.success(res, location, 'Location récupérée avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération de la location', 500, error);
    }
  }

  /**
   * Créer une nouvelle location
   */
  static async create(req, res) {
    try {
      const locationData = req.body;

      // Validation des données requises
      const requiredFields = ['name', 'address', 'city', 'postalCode'];
      const missingFields = requiredFields.filter(field => !locationData[field]);
      
      if (missingFields.length > 0) {
        return this.validationError(res, {
          message: 'Champs requis manquants',
          missingFields
        });
      }

      const location = await Location.create(locationData);

      return BaseController.success(res, location, 'Location créée avec succès', 201);

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return this.validationError(res, error.errors.map(err => ({
          field: err.path,
          message: err.message
        })));
      }
      
      if (error.name === 'SequelizeUniqueConstraintError') {
        return this.conflict(res, 'Une location avec ce nom existe déjà');
      }

      return BaseController.error(res, 'Erreur lors de la création de la location', 500, error);
    }
  }

  /**
   * Mettre à jour une location
   */
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const location = await Location.findByPk(id);
      
      if (!location) {
        return this.notFound(res, 'Location');
      }

      await location.update(updateData);

      return BaseController.success(res, location, 'Location mise à jour avec succès');

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return this.validationError(res, error.errors.map(err => ({
          field: err.path,
          message: err.message
        })));
      }

      return BaseController.error(res, 'Erreur lors de la mise à jour de la location', 500, error);
    }
  }

  /**
   * Supprimer une location
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const location = await Location.findByPk(id);
      
      if (!location) {
        return this.notFound(res, 'Location');
      }

      // Vérifier s'il y a des réservations associées
      const hasBookings = await location.hasBookings();
      if (hasBookings) {
        return this.conflict(res, 'Impossible de supprimer une location avec des réservations associées');
      }

      await location.destroy();

      return BaseController.success(res, null, 'Location supprimée avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la suppression de la location', 500, error);
    }
  }

  /**
   * Activer/Désactiver une location
   */
  static async toggleStatus(req, res) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      const location = await Location.findByPk(id);
      
      if (!location) {
        return this.notFound(res, 'Location');
      }

      await location.update({ isActive });

      return BaseController.success(res, location, `Location ${isActive ? 'activée' : 'désactivée'} avec succès`);

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la modification du statut de la location', 500, error);
    }
  }

  /**
   * Récupérer les statistiques d'une location
   */
  static async getStats(req, res) {
    try {
      const { id } = req.params;

      const location = await Location.findByPk(id, {
        include: [
          {
            model: Service,
            as: 'services',
            where: { isActive: true },
            required: false
          }
        ]
      });

      if (!location) {
        return this.notFound(res, 'Location');
      }

      const stats = {
        totalServices: location.services.length,
        // Ajouter d'autres statistiques selon les besoins
      };

      return BaseController.success(res, stats, 'Statistiques de la location récupérées avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des statistiques', 500, error);
    }
  }
}

module.exports = LocationController;
