const { Barber, Location } = require('../models');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');

class BarberController extends BaseController {
  /**
   * Récupérer tous les coiffeurs
   */
  static async getAll(req, res) {
    try {
      const { page = 1, limit = 10, search, locationId, isActive } = req.query;
      const offset = (page - 1) * limit;

      // Construire les conditions de recherche
      const whereConditions = {};
      
      if (isActive !== undefined) {
        whereConditions.isActive = isActive === 'true';
      }
      
      if (search) {
        whereConditions[Op.or] = [
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const includeOptions = [
        {
          model: Location,
          as: 'locations',
          where: { isActive: true },
          required: false,
          through: { attributes: [] }
        }
      ];

      // Filtrer par location si spécifiée
      if (locationId) {
        includeOptions[0].where = { 
          id: locationId,
          isActive: true 
        };
        includeOptions[0].required = true; // INNER JOIN pour ne retourner que les barbers associés
      }

      const { count, rows: barbers } = await Barber.findAndCountAll({
        where: whereConditions,
        include: includeOptions,
        order: [['firstName', 'ASC'], ['lastName', 'ASC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      // Si pas de pagination demandée, retourner tous les coiffeurs
      if (!page || page == 1) {
        return BaseController.success(res, { barbers }, 'Coiffeurs récupérés avec succès');
      }

      // Sinon, retourner avec pagination
      return this.paginated(res, barbers, {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count
      }, 'Coiffeurs récupérés avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des coiffeurs', 500, error);
    }
  }

  /**
   * Récupérer un coiffeur par ID
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const barber = await Barber.findByPk(id, {
        include: [
          {
            model: Location,
            as: 'locations',
            where: { isActive: true },
            required: false,
            through: { attributes: [] }
          }
        ]
      });

      if (!barber) {
        return this.notFound(res, 'Coiffeur');
      }

      return BaseController.success(res, barber, 'Coiffeur récupéré avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération du coiffeur', 500, error);
    }
  }

  /**
   * Créer un nouveau coiffeur
   */
  static async create(req, res) {
    try {
      const barberData = req.body;

      // Validation des données requises
      const requiredFields = ['firstName', 'lastName', 'email'];
      const missingFields = requiredFields.filter(field => !barberData[field]);
      
      if (missingFields.length > 0) {
        return this.validationError(res, {
          message: 'Champs requis manquants',
          missingFields
        });
      }

      const barber = await Barber.create(barberData);

      return BaseController.success(res, barber, 'Coiffeur créé avec succès', 201);

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return this.validationError(res, error.errors.map(err => ({
          field: err.path,
          message: err.message
        })));
      }
      
      if (error.name === 'SequelizeUniqueConstraintError') {
        return this.conflict(res, 'Un coiffeur avec cet email existe déjà');
      }

      return BaseController.error(res, 'Erreur lors de la création du coiffeur', 500, error);
    }
  }

  /**
   * Mettre à jour un coiffeur
   */
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const barber = await Barber.findByPk(id);
      
      if (!barber) {
        return this.notFound(res, 'Coiffeur');
      }

      await barber.update(updateData);

      return BaseController.success(res, barber, 'Coiffeur mis à jour avec succès');

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return this.validationError(res, error.errors.map(err => ({
          field: err.path,
          message: err.message
        })));
      }

      return BaseController.error(res, 'Erreur lors de la mise à jour du coiffeur', 500, error);
    }
  }

  /**
   * Supprimer un coiffeur
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const barber = await Barber.findByPk(id);
      
      if (!barber) {
        return this.notFound(res, 'Coiffeur');
      }

      // Vérifier s'il y a des réservations associées
      const hasBookings = await barber.hasBookings();
      if (hasBookings) {
        return this.conflict(res, 'Impossible de supprimer un coiffeur avec des réservations associées');
      }

      await barber.destroy();

      return BaseController.success(res, null, 'Coiffeur supprimé avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la suppression du coiffeur', 500, error);
    }
  }

  /**
   * Activer/Désactiver un coiffeur
   */
  static async toggleStatus(req, res) {
    try {
      const { id } = req.params;
      const { isActive } = req.body;

      const barber = await Barber.findByPk(id);
      
      if (!barber) {
        return this.notFound(res, 'Coiffeur');
      }

      await barber.update({ isActive });

      return BaseController.success(res, barber, `Coiffeur ${isActive ? 'activé' : 'désactivé'} avec succès`);

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la modification du statut du coiffeur', 500, error);
    }
  }

  /**
   * Associer un coiffeur à une location
   */
  static async addToLocation(req, res) {
    try {
      const { id } = req.params;
      const { locationId } = req.body;

      const barber = await Barber.findByPk(id);
      if (!barber) {
        return this.notFound(res, 'Coiffeur');
      }

      const location = await Location.findByPk(locationId);
      if (!location) {
        return this.notFound(res, 'Location');
      }

      await barber.addLocation(location);

      return BaseController.success(res, null, 'Coiffeur associé à la location avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de l\'association du coiffeur à la location', 500, error);
    }
  }

  /**
   * Dissocier un coiffeur d'une location
   */
  static async removeFromLocation(req, res) {
    try {
      const { id } = req.params;
      const { locationId } = req.body;

      const barber = await Barber.findByPk(id);
      if (!barber) {
        return this.notFound(res, 'Coiffeur');
      }

      const location = await Location.findByPk(locationId);
      if (!location) {
        return this.notFound(res, 'Location');
      }

      await barber.removeLocation(location);

      return BaseController.success(res, null, 'Coiffeur dissocié de la location avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la dissociation du coiffeur de la location', 500, error);
    }
  }

  /**
   * Récupérer les statistiques d'un coiffeur
   */
  static async getStats(req, res) {
    try {
      const { id } = req.params;

      const barber = await Barber.findByPk(id, {
        include: [
          {
            model: Location,
            as: 'locations',
            where: { isActive: true },
            required: false
          }
        ]
      });

      if (!barber) {
        return this.notFound(res, 'Coiffeur');
      }

      const stats = {
        totalLocations: barber.locations.length,
        rating: barber.rating,
        totalBookings: barber.totalBookings,
        // Ajouter d'autres statistiques selon les besoins
      };

      return BaseController.success(res, stats, 'Statistiques du coiffeur récupérées avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des statistiques', 500, error);
    }
  }

  /**
   * Rechercher des coiffeurs par spécialisation
   */
  static async getBySpecialization(req, res) {
    try {
      const { specialization } = req.params;

      const barbers = await Barber.findAll({
        where: {
          isActive: true,
          specializations: {
            [Op.contains]: [specialization]
          }
        },
        include: [
          {
            model: Location,
            as: 'locations',
            where: { isActive: true },
            required: false,
            through: { attributes: [] }
          }
        ],
        order: [['rating', 'DESC']]
      });

      return BaseController.success(res, barbers, `Coiffeurs spécialisés en ${specialization} récupérés avec succès`);

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la recherche des coiffeurs par spécialisation', 500, error);
    }
  }
}

module.exports = BarberController;
