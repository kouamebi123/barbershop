const { Booking, Service, Barber, Location, Admin } = require('../models');
const BaseController = require('./BaseController');
const { Op } = require('sequelize');
const { notificationService } = require('../services/notificationService');
const { schedulerService } = require('../services/schedulerService');

class BookingController extends BaseController {
  /**
   * Récupérer toutes les réservations
   */
  static async getAll(req, res) {
    try {
      const { 
        page = 1, 
        limit = 10, 
        search, 
        status, 
        locationId, 
        barberId, 
        serviceId,
        dateFrom,
        dateTo 
      } = req.query;
      const offset = (page - 1) * limit;

      // Construire les conditions de recherche
      const whereConditions = {};
      
      if (status) {
        whereConditions.status = status;
      }
      
      if (locationId) {
        whereConditions.locationId = locationId;
      }
      
      if (barberId) {
        whereConditions.barberId = barberId;
      }
      
      if (serviceId) {
        whereConditions['$services.id$'] = serviceId;
      }
      
      if (search) {
        whereConditions[Op.or] = [
          { customerName: { [Op.iLike]: `%${search}%` } },
          { customerEmail: { [Op.iLike]: `%${search}%` } },
          { customerPhone: { [Op.iLike]: `%${search}%` } }
        ];
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

      const { count, rows: bookings } = await Booking.findAndCountAll({
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
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
          },
          {
            model: Location,
            as: 'location',
            attributes: ['id', 'name', 'address', 'city', 'phone']
          }
        ],
        order: [['appointmentDate', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      // Si pas de pagination demandée, retourner toutes les réservations
      if (!page || page == 1) {
        return BaseController.success(res, { bookings }, 'Réservations récupérées avec succès');
      }

      // Sinon, retourner avec pagination
      return this.paginated(res, bookings, {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count
      }, 'Réservations récupérées avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des réservations', 500, error);
    }
  }

  /**
   * Récupérer une réservation par ID
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const booking = await Booking.findByPk(id, {
        include: [
          {
            model: Service,
            as: 'services',
            through: { attributes: [] }
          },
          {
            model: Barber,
            as: 'barber',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
          },
          {
            model: Location,
            as: 'location',
            attributes: ['id', 'name', 'address', 'city', 'phone']
          }
        ]
      });

      if (!booking) {
        return this.notFound(res, 'Réservation');
      }

      return BaseController.success(res, booking, 'Réservation récupérée avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération de la réservation', 500, error);
    }
  }

  /**
   * Créer une nouvelle réservation
   */
  static async create(req, res) {
    try {
      const bookingData = req.body;

      // Validation des données requises
      const requiredFields = ['customerName', 'customerEmail', 'customerPhone', 'appointmentDate', 'services', 'locationId'];
      const missingFields = requiredFields.filter(field => !bookingData[field]);
      
      if (missingFields.length > 0) {
        return this.validationError(res, {
          message: 'Champs requis manquants',
          missingFields
        });
      }

      // Transformer customerName en customerFirstName et customerLastName
      const nameParts = bookingData.customerName.trim().split(' ');
      const customerFirstName = nameParts[0] || '';
      const customerLastName = nameParts.slice(1).join(' ') || '';
      
      if (!customerFirstName || !customerLastName) {
        return this.validationError(res, {
          message: 'Le nom complet doit contenir au moins un prénom et un nom',
          customerName: 'Format invalide'
        });
      }

      // Vérifier que la location existe
      const location = await Location.findByPk(bookingData.locationId);
      if (!location) {
        return this.validationError(res, {
          message: 'Location non trouvée',
          locationId: 'Location invalide'
        });
      }

      // Vérifier que les services existent
      const services = await Service.findAll({
        where: { 
          id: { [Op.in]: bookingData.services },
          isActive: true 
        }
      });

      if (services.length !== bookingData.services.length) {
        return this.validationError(res, {
          message: 'Un ou plusieurs services sont invalides',
          services: 'Services non trouvés ou inactifs'
        });
      }

      // Calculer le prix total et la durée totale
      const totalPrice = services.reduce((sum, service) => sum + parseFloat(service.price), 0);
      const totalDuration = services.reduce((sum, service) => sum + parseInt(service.duration), 0);

      // Générer une référence de réservation
      const bookingReference = `BK${Date.now().toString().slice(-8)}`;

      // Créer la réservation
      const booking = await Booking.create({
        customerFirstName,
        customerLastName,
        customerEmail: bookingData.customerEmail,
        customerPhone: bookingData.customerPhone,
        appointmentDate: bookingData.appointmentDate,
        appointmentTime: bookingData.appointmentTime,
        locationId: bookingData.locationId,
        barberId: bookingData.barberId,
        totalPrice,
        duration: totalDuration,
        bookingReference,
        status: 'pending',
        notes: bookingData.notes || ''
      });

      // Associer les services
      await booking.setServices(services);

      // Envoyer une notification immédiate
      try {
        await schedulerService.sendImmediateNotification(booking);
      } catch (notificationError) {
        console.error('Erreur lors de l\'envoi de la notification:', notificationError);
      }

      return BaseController.success(res, booking, 'Réservation créée avec succès', 201);

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return this.validationError(res, error.errors.map(err => ({
          field: err.path,
          message: err.message
        })));
      }

      return BaseController.error(res, 'Erreur lors de la création de la réservation', 500, error);
    }
  }

  /**
   * Mettre à jour une réservation
   */
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const booking = await Booking.findByPk(id);
      
      if (!booking) {
        return this.notFound(res, 'Réservation');
      }

      // Si les services sont modifiés, recalculer le prix total
      if (updateData.services) {
        const services = await Service.findAll({
          where: { 
            id: { [Op.in]: updateData.services },
            isActive: true 
          }
        });

        if (services.length !== updateData.services.length) {
          return this.validationError(res, {
            message: 'Un ou plusieurs services sont invalides',
            services: 'Services non trouvés ou inactifs'
          });
        }

        updateData.totalPrice = services.reduce((sum, service) => sum + parseFloat(service.price), 0);
      }

      await booking.update(updateData);

      // Si les services sont modifiés, les mettre à jour
      if (updateData.services) {
        const services = await Service.findAll({
          where: { id: { [Op.in]: updateData.services } }
        });
        await booking.setServices(services);
      }

      return BaseController.success(res, booking, 'Réservation mise à jour avec succès');

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return this.validationError(res, error.errors.map(err => ({
          field: err.path,
          message: err.message
        })));
      }

      return BaseController.error(res, 'Erreur lors de la mise à jour de la réservation', 500, error);
    }
  }

  /**
   * Supprimer une réservation
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const booking = await Booking.findByPk(id);
      
      if (!booking) {
        return this.notFound(res, 'Réservation');
      }

      await booking.destroy();

      return BaseController.success(res, null, 'Réservation supprimée avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la suppression de la réservation', 500, error);
    }
  }

  /**
   * Confirmer une réservation
   */
  static async confirm(req, res) {
    try {
      const { id } = req.params;

      const booking = await Booking.findByPk(id);
      
      if (!booking) {
        return this.notFound(res, 'Réservation');
      }

      if (booking.status === 'confirmed') {
        return this.conflict(res, 'La réservation est déjà confirmée');
      }

      await booking.update({ status: 'confirmed' });

      // Envoyer une notification de confirmation
      try {
        await notificationService.sendBookingConfirmation(booking);
      } catch (notificationError) {
        console.error('Erreur lors de l\'envoi de la notification de confirmation:', notificationError);
      }

      return BaseController.success(res, booking, 'Réservation confirmée avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la confirmation de la réservation', 500, error);
    }
  }

  /**
   * Annuler une réservation
   */
  static async cancel(req, res) {
    try {
      const { id } = req.params;
      const { reason } = req.body;

      const booking = await Booking.findByPk(id);
      
      if (!booking) {
        return this.notFound(res, 'Réservation');
      }

      if (booking.status === 'cancelled') {
        return this.conflict(res, 'La réservation est déjà annulée');
      }

      await booking.update({ 
        status: 'cancelled',
        cancellationReason: reason
      });

      // Envoyer une notification d'annulation
      try {
        await notificationService.sendBookingCancellation(booking);
      } catch (notificationError) {
        console.error('Erreur lors de l\'envoi de la notification d\'annulation:', notificationError);
      }

      return BaseController.success(res, booking, 'Réservation annulée avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de l\'annulation de la réservation', 500, error);
    }
  }

  /**
   * Récupérer les disponibilités
   */
  static async getAvailability(req, res) {
    try {
      const { locationId, serviceIds, date } = req.query;

      if (!locationId || !serviceIds || !date) {
        return this.validationError(res, {
          message: 'Paramètres requis manquants',
          required: ['locationId', 'serviceIds', 'date']
        });
      }

      // Logique de vérification des disponibilités
      // Ici, vous pouvez implémenter la logique de vérification des créneaux disponibles
      const availability = {
        date,
        availableSlots: [
          '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
          '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
          '17:00', '17:30', '18:00'
        ]
      };

      return BaseController.success(res, availability, 'Disponibilités récupérées avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des disponibilités', 500, error);
    }
  }

  /**
   * Récupérer les statistiques des réservations
   */
  static async getStats(req, res) {
    try {
      const { locationId, dateFrom, dateTo } = req.query;

      const whereConditions = {};
      
      if (locationId) {
        whereConditions.locationId = locationId;
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

      const stats = await Booking.findAll({
        where: whereConditions,
        attributes: [
          'status',
          [require('sequelize').fn('COUNT', require('sequelize').col('id')), 'count'],
          [require('sequelize').fn('SUM', require('sequelize').col('totalPrice')), 'totalRevenue']
        ],
        group: ['status']
      });

      return BaseController.success(res, stats, 'Statistiques des réservations récupérées avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération des statistiques', 500, error);
    }
  }
}

module.exports = BookingController;
