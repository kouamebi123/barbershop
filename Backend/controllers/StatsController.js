const { Location, Service, Booking } = require('../models');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');

class StatsController extends BaseController {
  /**
   * Récupérer les statistiques générales
   */
  static async getGeneralStats(req, res) {
    try {
      const [
        totalLocations,
        totalServices,
        totalBookings,
        confirmedBookings,
        totalRevenue
      ] = await Promise.all([
        Location.count({ where: { isActive: true } }),
        Service.count({ where: { isActive: true } }),
        Booking.count(),
        Booking.count({ where: { status: 'confirmed' } }),
        Booking.sum('totalPrice', { where: { status: 'confirmed' } }) || 0
      ]);

      const stats = {
        totalLocations,
        totalServices,
        totalBookings,
        confirmedBookings,
        totalRevenue: totalRevenue ? parseFloat(totalRevenue.toFixed(2)) : 0
      };

      return BaseController.success(res, stats, 'Statistiques récupérées avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des statistiques', 500, error);
    }
  }

  /**
   * Récupérer les statistiques pour le dashboard
   */
  static async getDashboardStats(req, res) {
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

      const [
        totalLocations,
        totalServices,
        totalBookings,
        confirmedBookings,
        pendingBookings,
        cancelledBookings,
        totalRevenue,
        recentBookings
      ] = await Promise.all([
        Location.count({ where: { isActive: true } }),
        Service.count({ where: { isActive: true } }),
        Booking.count({ where: dateConditions }),
        Booking.count({ where: { ...dateConditions, status: 'confirmed' } }),
        Booking.count({ where: { ...dateConditions, status: 'pending' } }),
        Booking.count({ where: { ...dateConditions, status: 'cancelled' } }),
        Booking.sum('totalPrice', { where: { ...dateConditions, status: 'confirmed' } }) || 0,
        Booking.findAll({
          where: dateConditions,
          include: [
            {
              model: Location,
              as: 'location',
              attributes: ['id', 'name']
            },
          ],
          order: [['createdAt', 'DESC']],
          limit: 5
        })
      ]);

      const stats = {
        overview: {
          totalLocations,
          totalServices,
          totalBookings,
          confirmedBookings,
          pendingBookings,
          cancelledBookings,
          totalRevenue: totalRevenue ? parseFloat(totalRevenue.toFixed(2)) : 0
        },
        recentBookings
      };

      return BaseController.success(res, stats, 'Statistiques du dashboard récupérées avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des statistiques du dashboard', 500, error);
    }
  }
}

module.exports = StatsController;
