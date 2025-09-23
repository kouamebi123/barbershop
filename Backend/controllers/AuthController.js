const { Admin } = require('../models');
const BaseController = require('./BaseController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController extends BaseController {
  /**
   * Connexion administrateur
   */
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validation des données requises
      if (!username || !password) {
        return this.validationError(res, {
          message: 'Nom d\'utilisateur et mot de passe requis',
          username: !username ? 'Nom d\'utilisateur requis' : undefined,
          password: !password ? 'Mot de passe requis' : undefined
        });
      }

      // Rechercher l'administrateur
      const admin = await Admin.findOne({ where: { username } });
      
      if (!admin) {
        return this.unauthorized(res, 'Nom d\'utilisateur ou mot de passe incorrect');
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      
      if (!isPasswordValid) {
        return this.unauthorized(res, 'Nom d\'utilisateur ou mot de passe incorrect');
      }

      // Générer le token JWT
      const token = jwt.sign(
        { 
          id: admin.id, 
          username: admin.username,
          role: 'admin'
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Retourner les informations de l'admin (sans le mot de passe)
      const adminData = {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        createdAt: admin.createdAt
      };

      return BaseController.success(res, {
        admin: adminData,
        token
      }, 'Connexion réussie');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la connexion', 500, error);
    }
  }

  /**
   * Inscription administrateur
   */
  static async register(req, res) {
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

      // Vérifier si l'utilisateur existe déjà
      const existingAdmin = await Admin.findOne({
        where: {
          [require('sequelize').Op.or]: [
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

      // Générer le token JWT
      const token = jwt.sign(
        { 
          id: admin.id, 
          username: admin.username,
          role: admin.role
        },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '24h' }
      );

      // Retourner les informations de l'admin (sans le mot de passe)
      const adminData = {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        isActive: admin.isActive,
        createdAt: admin.createdAt
      };

      return BaseController.success(res, {
        admin: adminData,
        token
      }, 'Administrateur créé avec succès', 201);

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
   * Vérifier le token et récupérer les informations de l'utilisateur
   */
  static async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return this.unauthorized(res, 'Token d\'authentification requis');
      }

      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

      // Récupérer les informations de l'admin
      const admin = await Admin.findByPk(decoded.id, {
        attributes: ['id', 'username', 'email', 'role', 'isActive', 'createdAt']
      });

      if (!admin || !admin.isActive) {
        return this.unauthorized(res, 'Token invalide ou administrateur inactif');
      }

      return BaseController.success(res, { admin }, 'Token valide');

    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return this.unauthorized(res, 'Token invalide');
      }
      
      if (error.name === 'TokenExpiredError') {
        return this.unauthorized(res, 'Token expiré');
      }

      return BaseController.error(res, 'Erreur lors de la vérification du token', 500, error);
    }
  }

  /**
   * Changer le mot de passe
   */
  static async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const adminId = req.user.id;

      // Validation des données requises
      if (!currentPassword || !newPassword) {
        return this.validationError(res, {
          message: 'Mot de passe actuel et nouveau mot de passe requis',
          currentPassword: !currentPassword ? 'Mot de passe actuel requis' : undefined,
          newPassword: !newPassword ? 'Nouveau mot de passe requis' : undefined
        });
      }

      // Récupérer l'administrateur
      const admin = await Admin.findByPk(adminId);
      
      if (!admin) {
        return this.notFound(res, 'Administrateur');
      }

      // Vérifier le mot de passe actuel
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);
      
      if (!isCurrentPasswordValid) {
        return this.unauthorized(res, 'Mot de passe actuel incorrect');
      }

      // Hasher le nouveau mot de passe
      const hashedNewPassword = await bcrypt.hash(newPassword, 12);

      // Mettre à jour le mot de passe
      await admin.update({ password: hashedNewPassword });

      return BaseController.success(res, null, 'Mot de passe modifié avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors du changement de mot de passe', 500, error);
    }
  }

  /**
   * Déconnexion (invalider le token côté client)
   */
  static async logout(req, res) {
    try {
      // Dans une implémentation plus avancée, vous pourriez
      // ajouter le token à une liste noire
      return BaseController.success(res, null, 'Déconnexion réussie');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la déconnexion', 500, error);
    }
  }

  /**
   * Récupérer le profil de l'administrateur connecté
   */
  static async getProfile(req, res) {
    try {
      const adminId = req.user.id;

      const admin = await Admin.findByPk(adminId, {
        attributes: ['id', 'username', 'email', 'role', 'isActive', 'createdAt', 'updatedAt']
      });

      if (!admin) {
        return this.notFound(res, 'Administrateur');
      }

      return BaseController.success(res, { admin }, 'Profil récupéré avec succès');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la récupération du profil', 500, error);
    }
  }

  /**
   * Mettre à jour le profil de l'administrateur connecté
   */
  static async updateProfile(req, res) {
    try {
      const adminId = req.user.id;
      const updateData = req.body;

      // Ne pas permettre la modification du mot de passe via cette route
      delete updateData.password;

      const admin = await Admin.findByPk(adminId);
      
      if (!admin) {
        return this.notFound(res, 'Administrateur');
      }

      await admin.update(updateData);

      return BaseController.success(res, { admin }, 'Profil mis à jour avec succès');

    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        return this.validationError(res, error.errors.map(err => ({
          field: err.path,
          message: err.message
        })));
      }

      return BaseController.error(res, 'Erreur lors de la mise à jour du profil', 500, error);
    }
  }
}

module.exports = AuthController;
