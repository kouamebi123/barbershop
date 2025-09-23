const cron = require('node-cron');
const { Booking, Location, Barber, Service } = require('../models');
const notificationService = require('./notificationService');
const moment = require('moment');

class SchedulerService {
  constructor() {
    this.jobs = new Map();
    this.initializeScheduler();
  }

  initializeScheduler() {
    // Rappel 24h avant le rendez-vous (tous les jours à 9h)
    this.scheduleReminder24h();
    
    // Rappel 2h avant le rendez-vous (toutes les heures)
    this.scheduleReminder2h();
    
    // Nettoyage des réservations expirées (tous les jours à 2h)
    this.scheduleCleanup();
    
    console.log('✅ Planificateur de tâches initialisé');
  }

  // Planifier les rappels 24h avant
  scheduleReminder24h() {
    const job = cron.schedule('0 9 * * *', async () => {
      console.log('🔄 Exécution des rappels 24h...');
      await this.sendReminders24h();
    }, {
      scheduled: true,
      timezone: 'Europe/Paris'
    });

    this.jobs.set('reminder24h', job);
  }

  // Planifier les rappels 2h avant
  scheduleReminder2h() {
    const job = cron.schedule('0 * * * *', async () => {
      console.log('🔄 Exécution des rappels 2h...');
      await this.sendReminders2h();
    }, {
      scheduled: true,
      timezone: 'Europe/Paris'
    });

    this.jobs.set('reminder2h', job);
  }

  // Planifier le nettoyage des réservations expirées
  scheduleCleanup() {
    const job = cron.schedule('0 2 * * *', async () => {
      console.log('🔄 Nettoyage des réservations expirées...');
      await this.cleanupExpiredBookings();
    }, {
      scheduled: true,
      timezone: 'Europe/Paris'
    });

    this.jobs.set('cleanup', job);
  }

  // Envoyer les rappels 24h avant
  async sendReminders24h() {
    try {
      const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');
      
      const bookings = await Booking.findAll({
        where: {
          appointmentDate: tomorrow,
          status: ['pending', 'confirmed'],
          reminderSent: false
        },
        include: [
          {
            model: Location,
            as: 'location',
            attributes: ['name', 'address', 'city', 'phone']
          },
          {
            model: Barber,
            as: 'barber',
            attributes: ['firstName', 'lastName']
          },
          {
            model: Service,
            as: 'services',
            attributes: ['name', 'price']
          }
        ]
      });

      console.log(`📧 ${bookings.length} rappels 24h à envoyer`);

      for (const booking of bookings) {
        try {
          // Envoyer email
          if (process.env.EMAIL_ENABLED === 'true') {
            await notificationService.sendBookingReminder(booking);
          }

          // Envoyer SMS
          if (process.env.SMS_ENABLED === 'true') {
            await notificationService.sendBookingReminderSMS(booking);
          }

          // Marquer comme envoyé
          await booking.update({ reminderSent: true });
          
          console.log(`✅ Rappel envoyé pour ${booking.bookingReference}`);
        } catch (error) {
          console.error(`❌ Erreur rappel ${booking.bookingReference}:`, error.message);
        }
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi des rappels 24h:', error);
    }
  }

  // Envoyer les rappels 2h avant
  async sendReminders2h() {
    try {
      const in2Hours = moment().add(2, 'hours');
      const date = in2Hours.format('YYYY-MM-DD');
      const time = in2Hours.format('HH:mm');
      
      const bookings = await Booking.findAll({
        where: {
          appointmentDate: date,
          appointmentTime: time,
          status: ['pending', 'confirmed'],
          confirmationSent: false
        },
        include: [
          {
            model: Location,
            as: 'location',
            attributes: ['name', 'address', 'city', 'phone']
          },
          {
            model: Barber,
            as: 'barber',
            attributes: ['firstName', 'lastName']
          },
          {
            model: Service,
            as: 'services',
            attributes: ['name', 'price']
          }
        ]
      });

      console.log(`📧 ${bookings.length} rappels 2h à envoyer`);

      for (const booking of bookings) {
        try {
          // Envoyer email
          if (process.env.EMAIL_ENABLED === 'true') {
            await notificationService.sendBookingReminder(booking);
          }

          // Envoyer SMS
          if (process.env.SMS_ENABLED === 'true') {
            await notificationService.sendBookingReminderSMS(booking);
          }

          // Marquer comme envoyé
          await booking.update({ confirmationSent: true });
          
          console.log(`✅ Rappel 2h envoyé pour ${booking.bookingReference}`);
        } catch (error) {
          console.error(`❌ Erreur rappel 2h ${booking.bookingReference}:`, error.message);
        }
      }
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi des rappels 2h:', error);
    }
  }

  // Nettoyer les réservations expirées
  async cleanupExpiredBookings() {
    try {
      const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
      
      const expiredBookings = await Booking.findAll({
        where: {
          appointmentDate: {
            [require('sequelize').Op.lt]: yesterday
          },
          status: 'pending'
        }
      });

      console.log(`🧹 ${expiredBookings.length} réservations expirées à nettoyer`);

      for (const booking of expiredBookings) {
        await booking.update({ status: 'cancelled' });
        console.log(`✅ Réservation ${booking.bookingReference} marquée comme expirée`);
      }
    } catch (error) {
      console.error('❌ Erreur lors du nettoyage:', error);
    }
  }

  // Envoyer une notification immédiate
  async sendImmediateNotification(booking, type = 'confirmation') {
    try {
      let success = false;

      if (type === 'confirmation') {
        if (process.env.EMAIL_ENABLED === 'true') {
          success = await notificationService.sendBookingConfirmation(booking);
        }
        if (process.env.SMS_ENABLED === 'true') {
          await notificationService.sendBookingConfirmationSMS(booking);
        }
      } else if (type === 'cancellation') {
        if (process.env.EMAIL_ENABLED === 'true') {
          success = await notificationService.sendBookingCancellation(booking, booking.cancellationReason);
        }
      }

      return success;
    } catch (error) {
      console.error('❌ Erreur notification immédiate:', error);
      return false;
    }
  }

  // Arrêter tous les jobs
  stopAllJobs() {
    for (const [name, job] of this.jobs) {
      job.stop();
      console.log(`⏹️ Job ${name} arrêté`);
    }
  }

  // Redémarrer tous les jobs
  restartAllJobs() {
    this.stopAllJobs();
    this.initializeScheduler();
  }

  // Obtenir le statut des jobs
  getJobsStatus() {
    const status = {};
    for (const [name, job] of this.jobs) {
      status[name] = {
        running: job.running,
        scheduled: job.scheduled
      };
    }
    return status;
  }
}

module.exports = new SchedulerService();

