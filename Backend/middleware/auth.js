const jwt = require('jsonwebtoken');
const { Admin } = require('../models');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        error: 'Token d\'accès requis'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérifier que l'admin existe toujours et est actif
    const admin = await Admin.findByPk(decoded.adminId);
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        error: 'Token invalide ou compte désactivé'
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Token invalide'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expiré'
      });
    }
    
    console.error('Erreur d\'authentification:', error);
    res.status(500).json({
      error: 'Erreur d\'authentification'
    });
  }
};

// Middleware pour vérifier les permissions
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        error: 'Authentification requise'
      });
    }

    // Super admin a tous les droits
    if (req.admin.role === 'super_admin') {
      return next();
    }

    // Vérifier la permission spécifique
    if (!req.admin.permissions || !req.admin.permissions[permission]) {
      return res.status(403).json({
        error: 'Permissions insuffisantes'
      });
    }

    next();
  };
};

// Middleware pour vérifier le rôle
const requireRole = (roles) => {
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        error: 'Authentification requise'
      });
    }

    if (!allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({
        error: 'Rôle insuffisant'
      });
    }

    next();
  };
};

module.exports = {
  auth,
  requirePermission,
  requireRole
};
