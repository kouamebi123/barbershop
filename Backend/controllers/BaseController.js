/**
 * Contrôleur de base avec des méthodes communes
 */
class BaseController {
  /**
   * Gestionnaire de succès standardisé
   * @param {Object} res - Objet response Express
   * @param {*} data - Données à retourner
   * @param {string} message - Message de succès
   * @param {number} statusCode - Code de statut HTTP
   */
  static success(res, data = null, message = 'Opération réussie', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Gestionnaire d'erreur standardisé
   * @param {Object} res - Objet response Express
   * @param {string} message - Message d'erreur
   * @param {number} statusCode - Code de statut HTTP
   * @param {Error} error - Erreur originale (optionnel)
   */
  static error(res, message = 'Une erreur est survenue', statusCode = 500, error = null) {
    console.error('Erreur dans le contrôleur:', {
      message,
      statusCode,
      error: error?.message || error,
      stack: error?.stack
    });

    return res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error?.message : undefined,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Gestionnaire de validation d'erreur
   * @param {Object} res - Objet response Express
   * @param {Object} errors - Erreurs de validation
   */
  static validationError(res, errors) {
    return res.status(400).json({
      success: false,
      message: 'Erreurs de validation',
      errors,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Gestionnaire de ressource non trouvée
   * @param {Object} res - Objet response Express
   * @param {string} resource - Nom de la ressource
   */
  static notFound(res, resource = 'Ressource') {
    return res.status(404).json({
      success: false,
      message: `${resource} non trouvée`,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Gestionnaire d'accès non autorisé
   * @param {Object} res - Objet response Express
   * @param {string} message - Message d'erreur
   */
  static unauthorized(res, message = 'Accès non autorisé') {
    return res.status(401).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Gestionnaire d'accès interdit
   * @param {Object} res - Objet response Express
   * @param {string} message - Message d'erreur
   */
  static forbidden(res, message = 'Accès interdit') {
    return res.status(403).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Gestionnaire de conflit
   * @param {Object} res - Objet response Express
   * @param {string} message - Message d'erreur
   */
  static conflict(res, message = 'Conflit de ressource') {
    return res.status(409).json({
      success: false,
      message,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Gestionnaire de pagination
   * @param {Object} res - Objet response Express
   * @param {Array} data - Données paginées
   * @param {Object} pagination - Informations de pagination
   * @param {string} message - Message de succès
   */
  static paginated(res, data, pagination, message = 'Données récupérées avec succès') {
    return res.status(200).json({
      success: true,
      message,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.limit),
        hasNext: pagination.page < Math.ceil(pagination.total / pagination.limit),
        hasPrev: pagination.page > 1
      },
      timestamp: new Date().toISOString()
    });
  }
}

module.exports = BaseController;
