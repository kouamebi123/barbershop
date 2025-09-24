const Joi = require('joi');
const nodemailer = require('nodemailer');
const BaseController = require('./BaseController');
require('dotenv').config();

class ContactController extends BaseController {
  constructor() {
    super();
    // Configuration email
    this.emailTransporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Schéma de validation pour le formulaire de contact
    this.contactSchema = Joi.object({
      name: Joi.string().min(2).max(100).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().pattern(/^[\+]?[0-9\s\-\(\)]+$/).optional(),
      subject: Joi.string().min(5).max(200).required(),
      message: Joi.string().min(10).max(1000).required()
    });
  }

  /**
   * Envoyer le formulaire de contact
   */
  static async sendContactForm(req, res) {
    try {
      const controller = new ContactController();
      
      // Validation des données
      const { error, value } = controller.contactSchema.validate(req.body);
      if (error) {
        return BaseController.error(res, 'Données invalides', 400, error.details[0].message);
      }

      const { name, email, phone, subject, message } = value;

      // Préparer l'email
      const mailOptions = {
        from: `"Barbershop Rennes" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Email de réception
        subject: `[Contact Barbershop] ${subject}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Téléphone:</strong> ${phone}</p>` : ''}
          <p><strong>Sujet:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><em>Message envoyé depuis le site web Barbershop</em></p>
        `
      };

      // Envoyer l'email
      if (process.env.EMAIL_ENABLED === 'true') {
        await controller.emailTransporter.sendMail(mailOptions);
        console.log(`Email de contact envoyé de ${email}`);
      } else {
        console.log('Email désactivé - Message de contact:', { name, email, subject, message });
      }

      return BaseController.success(res, {
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
      }, 'Message envoyé avec succès');

    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire de contact:', error);
      return BaseController.error(res, 'Erreur lors de l\'envoi du message', 500, error);
    }
  }
}

module.exports = ContactController;
