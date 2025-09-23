const BaseController = require('./BaseController');

class HealthController extends BaseController {
  /**
   * Vérifier l'état de santé de l'API
   */
  static async getHealth(req, res) {
    try {
      const healthData = {
        status: 'OK',
        message: 'Barbershop API is running',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || '1.0.0'
      };

      return BaseController.success(res, healthData, 'API en bonne santé');

    } catch (error) {
      return BaseController.error(res, 'Erreur lors de la vérification de santé', 500, error);
    }
  }
}

module.exports = HealthController;
