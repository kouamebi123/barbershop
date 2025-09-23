const { Service, Location } = require('../models');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');

class ServiceController extends BaseController {
  /**
   * Récupérer tous les services
   */
  static async getAll(req, res) {
    try {
      const { page = 1, limit = 10, search, category, locationId, isActive } = req.query;
      const offset = (page - 1) * limit;

      console.log('🔍 [ServiceController] getAll - Query params:', { page, limit, search, category, locationId, isActive });

      // Construire les conditions de recherche
      const whereConditions = {};
      
      if (isActive !== undefined) {
        whereConditions.isActive = isActive === 'true';
      }
      
      if (category) {
        whereConditions.category = category;
      }
      
      if (locationId) {
        whereConditions.locationId = locationId;
      }
      
      if (search) {
        whereConditions[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ];
      }
      
      console.log('🔍 [ServiceController] getAll - Where conditions:', whereConditions);

      const { count, rows: services } = await Service.findAndCountAll({
        where: whereConditions,
        include: [
          {
            model: Location,
            as: 'location',
            attributes: ['id', 'name', 'address', 'city', 'phone']
          }
        ],
        order: [['category', 'ASC'], ['price', 'ASC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      console.log('🔍 [ServiceController] getAll - Found services:', services.length, 'out of', count);
      console.log('🔍 [ServiceController] getAll - First service:', services[0] ? {
        id: services[0].id,
        name: services[0].name,
        category: services[0].category,
        isActive: services[0].isActive
      } : 'No services found');

      // Grouper les services par catégorie
      const servicesByCategory = {};
      services.forEach(service => {
        if (!servicesByCategory[service.category]) {
          servicesByCategory[service.category] = [];
        }
        servicesByCategory[service.category].push(service);
      });

      // Si pas de pagination demandée, retourner tous les services
      if (!page || page == 1) {
        console.log('🔍 [ServiceController] getAll - Returning response:', {
          servicesCount: services.length,
          categoriesCount: Object.keys(servicesByCategory).length
        });
        return BaseController.success(res, { 
          services, 
          servicesByCategory 
        }, 'Services récupérés avec succès');
      }

      // Sinon, retourner avec pagination
      return BaseController.success(res, { 
        services, 
        servicesByCategory,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: count
        }
      }, 'Services récupérés avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des services', 500, error);
    }
  }

  /**
   * Récupérer les catégories de services
   */
  static async getCategories(req, res) {
    try {
      const categories = await Service.findAll({
        attributes: ['category'],
        group: ['category'],
        where: { isActive: true }
      });

      const categoryList = categories.map(cat => ({
        id: cat.category,
        name: cat.category.charAt(0).toUpperCase() + cat.category.slice(1)
      }));

      return BaseController.success(res, categoryList, 'Catégories récupérées avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des catégories', 500, error);
    }
  }

  /**
   * Récupérer un service par ID
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const service = await Service.findByPk(id, {
        include: [
          {
            model: Location,
            as: 'location',
            attributes: ['id', 'name', 'address', 'city', 'phone']
          }
        ]
      });

      if (!service) {
        return this.notFound(res, 'Service');
      }

      return BaseController.success(res, service, 'Service récupéré avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération du service', 500, error);
    }
  }

  /**
   * Créer un nouveau service
   */
  static async create(req, res) {
    try {
      const serviceData = req.body;

      // Validation des données requises
      const requiredFields = ['name', 'description', 'price', 'duration', 'category', 'locationId'];
      const missingFields = requiredFields.filter(field => !serviceData[field]);
      
      if (missingFields.length > 0) {
        return this.validationError(res, {
          message: 'Champs requis manquants',
          missingFields
        });
      }

      // Vérifier que la location existe
      const location = await Location.findByPk(serviceData.locationId);
      if (!location) {
        return this.validationError(res, {
          message: 'Location non trouvée',
          locationId: 'Location invalide'
        });
      }

      const service = await Service.create(serviceData);

      return BaseController.success(res, service, 'Service créé avec succès', 201);

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return this.validationError(res, error.errors.map(err => ({
          field: err.path,
          message: err.message
        })));
      }
      
      if (error.name === 'SequelizeForeignKeyConstraintError') {
        return this.validationError(res, {
          message: 'Location invalide',
          locationId: 'La location spécifiée n\'existe pas'
        });
      }

      return BaseController.error(res, 'Erreur lors de la création du service', 500, error);
    }
  }

  /**
   * Mettre à jour un service
   */
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const service = await Service.findByPk(id);
      
      if (!service) {
        return this.notFound(res, 'Service');
      }

      // Vérifier que la location existe si elle est fournie
      if (updateData.locationId) {
        const location = await Location.findByPk(updateData.locationId);
        if (!location) {
          return this.validationError(res, {
            message: 'Location non trouvée',
            locationId: 'Location invalide'
          });
        }
      }

      await service.update(updateData);

      return BaseController.success(res, service, 'Service mis à jour avec succès');

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return this.validationError(res, error.errors.map(err => ({
          field: err.path,
          message: err.message
        })));
      }

      return BaseController.error(res, 'Erreur lors de la mise à jour du service', 500, error);
    }
  }

  /**
   * Supprimer un service
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const service = await Service.findByPk(id);
      
      if (!service) {
        return this.notFound(res, 'Service');
      }

      // Vérifier s'il y a des réservations associées
      const hasBookings = await service.hasBookings();
      if (hasBookings) {
        return this.conflict(res, 'Impossible de supprimer un service avec des réservations associées');
      }

      await service.destroy();

      return BaseController.success(res, null, 'Service supprimé avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la suppression du service', 500, error);
    }
  }

  /**
   * Activer/Désactiver un service
   */
  static async toggleStatus(req, res) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      const service = await Service.findByPk(id);
      
      if (!service) {
        return this.notFound(res, 'Service');
      }

      await service.update({ isActive });

      return BaseController.success(res, service, `Service ${isActive ? 'activé' : 'désactivé'} avec succès`);

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la modification du statut du service', 500, error);
    }
  }

  /**
   * Récupérer les services par catégorie
   */
  static async getByCategory(req, res) {
    try {
      const { category } = req.params;

      const services = await Service.findAll({
        where: { 
          category,
          isActive: true 
        },
        include: [
          {
            model: Location,
            as: 'location',
            attributes: ['id', 'name', 'address', 'city']
          }
        ],
        order: [['price', 'ASC']]
      });

      return BaseController.success(res, services, `Services de la catégorie ${category} récupérés avec succès`);

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des services par catégorie', 500, error);
    }
  }

  /**
   * Récupérer les services par location
   */
  static async getByLocation(req, res) {
    try {
      const { locationId } = req.params;

      const services = await Service.findAll({
        where: { 
          locationId,
          isActive: true 
        },
        include: [
          {
            model: Location,
            as: 'location',
            attributes: ['id', 'name', 'address', 'city']
          }
        ],
        order: [['category', 'ASC'], ['price', 'ASC']]
      });

      return BaseController.success(res, services, 'Services de la location récupérés avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des services par location', 500, error);
    }
  }
}

module.exports = ServiceController;
