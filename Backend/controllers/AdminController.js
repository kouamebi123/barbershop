const { Admin, Booking, Location, Barber, Service } = require('../models');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

class AdminController extends BaseController {
  /**
   * Récupérer le tableau de bord
   */
  static async getDashboard(req, res) {
    try {
      const { dateFrom, dateTo } = req.query;

      // Construire les conditions de date
      const dateConditions = {};
      if (dateFrom || dateTo) {
        dateConditions.createdAt = {};
        if (dateFrom) {
          dateConditions.createdAt[Op.gte] = new Date(dateFrom);
        }
        if (dateTo) {
          dateConditions.createdAt[Op.lte] = new Date(dateTo);
        }
      }

      // Récupérer les statistiques
      const [
        totalBookings,
        confirmedBookings,
        cancelledBookings,
        pendingBookings,
        totalRevenue,
        totalLocations,
        totalBarbers,
        totalServices,
        recentBookings
      ] = await Promise.all([
        Booking.count({ where: dateConditions }),
        Booking.count({ where: { ...dateConditions, status: 'confirmed' } }),
        Booking.count({ where: { ...dateConditions, status: 'cancelled' } }),
        Booking.count({ where: { ...dateConditions, status: 'pending' } }),
        Booking.sum('totalPrice', { where: { ...dateConditions, status: 'confirmed' } }) || 0,
        Location.count({ where: { isActive: true } }),
        Barber.count({ where: { isActive: true } }),
        Service.count({ where: { isActive: true } }),
        Booking.findAll({
          where: dateConditions,
          include: [
            {
              model: Location,
              as: 'location',
              attributes: ['id', 'name']
            },
            {
              model: Barber,
              as: 'barber',
              attributes: ['id', 'firstName', 'lastName']
            }
          ],
          order: [['createdAt', 'DESC']],
          limit: 10
        })
      ]);

      const dashboard = {
        overview: {
          totalBookings,
          confirmedBookings,
          cancelledBookings,
          pendingBookings,
          totalRevenue: parseFloat(totalRevenue.toFixed(2)),
          totalLocations,
          totalBarbers,
          totalServices
        },
        recentBookings,
        charts: {
          bookingsByStatus: [
            { status: 'confirmed', count: confirmedBookings },
            { status: 'pending', count: pendingBookings },
            { status: 'cancelled', count: cancelledBookings }
          ],
          revenueByMonth: await this.getRevenueByMonth(dateFrom, dateTo),
          bookingsByLocation: await this.getBookingsByLocation(dateFrom, dateTo)
        }
      };

      return BaseController.success(res, dashboard, 'Tableau de bord récupéré avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération du tableau de bord', 500, error);
    }
  }

  /**
   * Récupérer les revenus par mois
   */
  static async getRevenueByMonth(dateFrom, dateTo) {
    try {
      const revenueData = await Booking.findAll({
        attributes: [
          [require('sequelize').fn('DATE_TRUNC', 'month', require('sequelize').col('createdAt')), 'month'],
          [require('sequelize').fn('SUM', require('sequelize').col('totalPrice')), 'revenue']
        ],
        where: {
          status: 'confirmed',
          ...(dateFrom || dateTo ? {
            createdAt: {
              ...(dateFrom ? { [Op.gte]: new Date(dateFrom) } : {}),
              ...(dateTo ? { [Op.lte]: new Date(dateTo) } : {})
            }
          } : {})
        },
        group: [require('sequelize').fn('DATE_TRUNC', 'month', require('sequelize').col('createdAt'))],
        order: [[require('sequelize').fn('DATE_TRUNC', 'month', require('sequelize').col('createdAt')), 'ASC']]
      });

      return revenueData.map(item => ({
        month: item.dataValues.month,
        revenue: parseFloat(item.dataValues.revenue || 0)
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des revenus par mois:', error);
      return [];
    }
  }

  /**
   * Récupérer les réservations par location
   */
  static async getBookingsByLocation(dateFrom, dateTo) {
    try {
      const locationData = await Booking.findAll({
        attributes: [
          [require('sequelize').col('location.name'), 'locationName'],
          [require('sequelize').fn('COUNT', require('sequelize').col('Booking.id')), 'count']
        ],
        include: [
          {
            model: Location,
            as: 'location',
            attributes: []
          }
        ],
        where: {
          ...(dateFrom || dateTo ? {
            createdAt: {
              ...(dateFrom ? { [Op.gte]: new Date(dateFrom) } : {}),
              ...(dateTo ? { [Op.lte]: new Date(dateTo) } : {})
            }
          } : {})
        },
        group: [require('sequelize').col('location.name')],
        order: [[require('sequelize').fn('COUNT', require('sequelize').col('Booking.id')), 'DESC']]
      });

      return locationData.map(item => ({
        locationName: item.dataValues.locationName,
        count: parseInt(item.dataValues.count)
      }));
    } catch (error) {
      console.error('Erreur lors de la récupération des réservations par location:', error);
      return [];
    }
  }

  /**
   * Récupérer tous les administrateurs
   */
  static async getAllAdmins(req, res) {
    try {
      const { page = 1, limit = 10, search, isActive } = req.query;
      const offset = (page - 1) * limit;

      const whereConditions = {};
      
      if (isActive !== undefined) {
        whereConditions.isActive = isActive === 'true';
      }
      
      if (search) {
        whereConditions[Op.or] = [
          { username: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ];
      }

      const { count, rows: admins } = await Admin.findAndCountAll({
        where: whereConditions,
        attributes: ['id', 'username', 'email', 'role', 'isActive', 'createdAt', 'updatedAt'],
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      return this.paginated(res, admins, {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count
      }, 'Administrateurs récupérés avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des administrateurs', 500, error);
    }
  }

  /**
   * Créer un nouvel administrateur
   */
  static async createAdmin(req, res) {
    try {
      const { username, email, password, role = 'admin' } = req.body;

      // Validation des données requises
      const requiredFields = ['username', 'email', 'password'];
      const missingFields = requiredFields.filter(field => !req.body[field]);
      
      if (missingFields.length > 0) {
        return this.validationError(res, {
          message: 'Champs requis manquants',
          missingFields
        });
      }

      // Vérifier si l'administrateur existe déjà
      const existingAdmin = await Admin.findOne({
        where: {
          [Op.or]: [
            { username },
            { email }
          ]
        }
      });

      if (existingAdmin) {
        return this.conflict(res, 'Un administrateur avec ce nom d\'utilisateur ou cet email existe déjà');
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 12);

      // Créer l'administrateur
      const admin = await Admin.create({
        username,
        email,
        password: hashedPassword,
        role,
        isActive: true
      });

      // Retourner sans le mot de passe
      const adminData = {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        createdAt: admin.createdAt
      };

      return BaseController.success(res, adminData, 'Administrateur créé avec succès', 201);

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return this.validationError(res, error.errors.map(err => ({
          field: err.path,
          message: err.message
        })));
      }

      return BaseController.error(res, 'Erreur lors de la création de l\'administrateur', 500, error);
    }
  }

  /**
   * Mettre à jour un administrateur
   */
  static async updateAdmin(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const admin = await Admin.findByPk(id);
      
      if (!admin) {
        return this.notFound(res, 'Administrateur');
      }

      // Ne pas permettre la modification du mot de passe via cette route
      delete updateData.password;

      await admin.update(updateData);

      // Retourner sans le mot de passe
      const adminData = {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt
      };

      return BaseController.success(res, adminData, 'Administrateur mis à jour avec succès');

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return this.validationError(res, error.errors.map(err => ({
          field: err.path,
          message: err.message
        })));
      }

      return BaseController.error(res, 'Erreur lors de la mise à jour de l\'administrateur', 500, error);
    }
  }

  /**
   * Supprimer un administrateur
   */
  static async deleteAdmin(req, res) {
    try {
      const { id } = req.params;

      const admin = await Admin.findByPk(id);
      
      if (!admin) {
        return this.notFound(res, 'Administrateur');
      }

      // Ne pas permettre la suppression de son propre compte
      if (admin.id === req.user.id) {
        return this.forbidden(res, 'Vous ne pouvez pas supprimer votre propre compte');
      }

      await admin.destroy();

      return BaseController.success(res, null, 'Administrateur supprimé avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la suppression de l\'administrateur', 500, error);
    }
  }

  /**
   * Exporter les réservations
   */
  static async exportBookings(req, res) {
    try {
      const { format = 'json', dateFrom, dateTo, status } = req.query;

      const whereConditions = {};
      
      if (status) {
        whereConditions.status = status;
      }
      
      if (dateFrom || dateTo) {
        whereConditions.appointmentDate = {};
        if (dateFrom) {
          whereConditions.appointmentDate[Op.gte] = new Date(dateFrom);
        }
        if (dateTo) {
          whereConditions.appointmentDate[Op.lte] = new Date(dateTo);
        }
      }

      const bookings = await Booking.findAll({
        where: whereConditions,
        include: [
          {
            model: Service,
            as: 'services',
            through: { attributes: [] }
          },
          {
            model: Barber,
            as: 'barber',
            attributes: ['firstName', 'lastName', 'email']
          },
          {
            model: Location,
            as: 'location',
            attributes: ['name', 'address', 'city']
          }
        ],
        order: [['appointmentDate', 'DESC']]
      });

      if (format === 'csv') {
        // Implémenter l'export CSV si nécessaire
        return BaseController.success(res, { bookings }, 'Export CSV non implémenté');
      }

      return BaseController.success(res, { bookings }, 'Réservations exportées avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de l\'export des réservations', 500, error);
    }
  }
}

module.exports = AdminController;
