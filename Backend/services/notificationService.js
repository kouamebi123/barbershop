const nodemailer = require('nodemailer');
const twilio = require('twilio');

class NotificationService {
  constructor() {
    this.emailTransporter = null;
    this.twilioClient = null;
    this.initializeServices();
  }

  initializeServices() {
    // Configuration email
    if (process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      this.emailTransporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
    }

    // Configuration SMS
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && 
        process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
      this.twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
    }
  }

  // Envoyer un email de confirmation de réservation
  async sendBookingConfirmation(booking) {
    console.log('📧 [NotificationService] sendBookingConfirmation appelé');
    console.log('📧 [NotificationService] Email transporter disponible:', !!this.emailTransporter);
    console.log('📧 [NotificationService] EMAIL_ENABLED:', process.env.EMAIL_ENABLED);
    
    if (!this.emailTransporter) {
      console.warn('❌ Service email non configuré');
      return false;
    }

    if (process.env.EMAIL_ENABLED !== 'true') {
      console.warn('❌ EMAIL_ENABLED n\'est pas activé');
      return false;
    }

    try {
      const mailOptions = {
        from: `"Barbershop Rennes" <${process.env.EMAIL_USER}>`,
        to: booking.customerEmail,
        subject: `Confirmation de réservation - ${booking.bookingReference}`,
        html: this.generateBookingConfirmationHTML(booking)
      };

      console.log('📧 [NotificationService] Envoi de l\'email vers:', booking.customerEmail);
      await this.emailTransporter.sendMail(mailOptions);
      console.log(`✅ Email de confirmation envoyé à ${booking.customerEmail}`);
      return true;
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      return false;
    }
  }

  // Envoyer un rappel de réservation
  async sendBookingReminder(booking) {
    if (!this.emailTransporter) {
      console.warn('Service email non configuré');
      return false;
    }

    try {
      const mailOptions = {
        from: `"Barbershop Rennes" <${process.env.EMAIL_USER}>`,
        to: booking.customerEmail,
        subject: `Rappel - Votre rendez-vous demain`,
        html: this.generateBookingReminderHTML(booking)
      };

      await this.emailTransporter.sendMail(mailOptions);
      console.log(`Rappel envoyé à ${booking.customerEmail}`);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du rappel:', error);
      return false;
    }
  }

  // Envoyer un SMS de confirmation
  async sendBookingConfirmationSMS(booking) {
    if (!this.twilioClient) {
      console.warn('Service SMS non configuré');
      return false;
    }

    try {
      const message = `Bonjour ${booking.customerFirstName}, votre réservation est confirmée pour le ${booking.appointmentDate} à ${booking.appointmentTime}. Référence: ${booking.bookingReference}`;
      
      await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: booking.customerPhone
      });

      console.log(`SMS de confirmation envoyé à ${booking.customerPhone}`);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du SMS:', error);
      return false;
    }
  }

  // Envoyer un SMS de rappel
  async sendBookingReminderSMS(booking) {
    if (!this.twilioClient) {
      console.warn('Service SMS non configuré');
      return false;
    }

    try {
      const message = `Rappel: Votre rendez-vous chez Barbershop Rennes est demain à ${booking.appointmentTime}. Référence: ${booking.bookingReference}`;
      
      await this.twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: booking.customerPhone
      });

      console.log(`SMS de rappel envoyé à ${booking.customerPhone}`);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'envoi du SMS de rappel:', error);
      return false;
    }
  }

  // Envoyer une notification d'annulation
  async sendBookingCancellation(booking, reason) {
    if (!this.emailTransporter) {
      console.warn('Service email non configuré');
      return false;
    }

    try {
      const mailOptions = {
        from: `"Barbershop Rennes" <${process.env.EMAIL_USER}>`,
        to: booking.customerEmail,
        subject: `Annulation de réservation - ${booking.bookingReference}`,
        html: this.generateBookingCancellationHTML(booking, reason)
      };

      await this.emailTransporter.sendMail(mailOptions);
      console.log(`Email d'annulation envoyé à ${booking.customerEmail}`);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email d\'annulation:', error);
      return false;
    }
  }

  // Générer le HTML pour la confirmation de réservation
  generateBookingConfirmationHTML(booking) {
    const services = booking.services ? 
      booking.services.map(s => `${s.name} - ${s.price}€`).join('<br>') : 
      'Services non disponibles';
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Confirmation de réservation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .booking-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Barbershop Rennes</h1>
            <h2>Confirmation de réservation</h2>
          </div>
          <div class="content">
            <p>Bonjour ${booking.customerFirstName},</p>
            <p>Votre réservation a été confirmée avec succès !</p>
            
            <div class="booking-details">
              <h3>Détails de votre réservation</h3>
              <p><strong>Référence:</strong> ${booking.bookingReference}</p>
              <p><strong>Date:</strong> ${booking.appointmentDate}</p>
              <p><strong>Heure:</strong> ${booking.appointmentTime}</p>
              <p><strong>Service:</strong> ${booking.services?.map(s => s.name).join(', ') || 'Service général'}</p>
              <p><strong>Adresse:</strong> ${booking.location ? 
                `${booking.location.name}<br>${booking.location.address}<br>${booking.location.city} ${booking.location.postalCode}` : 
                'Adresse non disponible'}</p>
              <p><strong>Services:</strong><br>${services}</p>
              <p><strong>Durée totale:</strong> ${booking.duration} minutes</p>
              <p><strong>Prix total:</strong> ${booking.totalPrice}€</p>
            </div>
            
            <p>Nous vous attendons !</p>
            <p>L'équipe Barbershop Rennes</p>
          </div>
          <div class="footer">
            <p>Barbershop Rennes - Votre coiffeur de confiance</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Générer le HTML pour le rappel de réservation
  generateBookingReminderHTML(booking) {
    const services = booking.services ? 
      booking.services.map(s => `${s.name}`).join(', ') : 
      'Services non disponibles';
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Rappel de réservation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .booking-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Barbershop Rennes</h1>
            <h2>Rappel de votre rendez-vous</h2>
          </div>
          <div class="content">
            <p>Bonjour ${booking.customerFirstName},</p>
            <p>Nous vous rappelons votre rendez-vous demain !</p>
            
            <div class="booking-details">
              <h3>Votre rendez-vous</h3>
              <p><strong>Date:</strong> ${booking.appointmentDate}</p>
              <p><strong>Heure:</strong> ${booking.appointmentTime}</p>
              <p><strong>Service:</strong> ${booking.services?.map(s => s.name).join(', ') || 'Service général'}</p>
              <p><strong>Services:</strong> ${services}</p>
              <p><strong>Adresse:</strong> ${booking.location.name}<br>
                 ${booking.location.address}<br>
                 ${booking.location.city}</p>
            </div>
            
            <p>À bientôt !</p>
            <p>L'équipe Barbershop Rennes</p>
          </div>
          <div class="footer">
            <p>Barbershop Rennes - Votre coiffeur de confiance</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Générer le HTML pour l'annulation de réservation
  generateBookingCancellationHTML(booking, reason) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Annulation de réservation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1a1a1a; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .booking-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Barbershop Rennes</h1>
            <h2>Annulation de réservation</h2>
          </div>
          <div class="content">
            <p>Bonjour ${booking.customerFirstName},</p>
            <p>Votre réservation a été annulée.</p>
            
            <div class="booking-details">
              <h3>Réservation annulée</h3>
              <p><strong>Référence:</strong> ${booking.bookingReference}</p>
              <p><strong>Date:</strong> ${booking.appointmentDate}</p>
              <p><strong>Heure:</strong> ${booking.appointmentTime}</p>
              <p><strong>Raison:</strong> ${reason || 'Non spécifiée'}</p>
            </div>
            
            <p>Nous espérons vous revoir bientôt !</p>
            <p>L'équipe Barbershop Rennes</p>
          </div>
          <div class="footer">
            <p>Barbershop Rennes - Votre coiffeur de confiance</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }
}

module.exports = new NotificationService();

