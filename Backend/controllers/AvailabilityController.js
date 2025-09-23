const { sequelize } = require('../config/database');
const BaseController = require('./BaseController');

class AvailabilityController extends BaseController {
  /**
   * Récupérer les créneaux disponibles pour un coiffeur à une date donnée
   */
  static async getAvailability(req, res) {
    try {
      const { barberId } = req.params;
      const { locationId, date } = req.query;

      console.log('🔍 [AvailabilityController] getAvailability - Params:', { barberId, locationId, date });

      if (!barberId || !locationId || !date) {
        return BaseController.error(res, 'Paramètres manquants', 400, 'barberId, locationId et date sont requis');
      }

      // Vérifier que le coiffeur existe et travaille dans cette location
      const barberQuery = `
        SELECT b.*, bl.location_id
        FROM barbers b
        JOIN barber_locations bl ON b.id = bl.barber_id
        WHERE b.id = :barberId AND bl.location_id = :locationId AND b.is_active = true
      `;

      const barberResult = await sequelize.query(barberQuery, {
        replacements: { barberId, locationId },
        type: sequelize.QueryTypes.SELECT
      });

      if (barberResult.length === 0) {
        return BaseController.error(res, 'Coiffeur non trouvé', 404, 'Le coiffeur n\'existe pas ou ne travaille pas dans cette location');
      }

      const barber = barberResult[0];
      console.log('🔍 [AvailabilityController] getAvailability - Barber found:', barber.first_name, barber.last_name);

      // Générer les créneaux disponibles pour la date donnée
      const availableSlots = generateAvailableSlots(barber, date);

      console.log('🔍 [AvailabilityController] getAvailability - Generated slots:', availableSlots.length);

      return BaseController.success(res, availableSlots, 'Créneaux disponibles récupérés avec succès');

    } catch (error) {
      console.error('❌ [AvailabilityController] getAvailability - Error:', error);
      return BaseController.error(res, 'Erreur lors de la récupération des créneaux', 500, error.message);
    }
  }
}

/**
 * Générer les créneaux disponibles pour un coiffeur
 */
function generateAvailableSlots(barber, date) {
  const slots = [];
  const appointmentDate = new Date(date);
  const dayOfWeek = appointmentDate.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
  
  // Mapper les jours français vers anglais
  const dayMapping = {
    'lundi': 'monday',
    'mardi': 'tuesday', 
    'mercredi': 'wednesday',
    'jeudi': 'thursday',
    'vendredi': 'friday',
    'samedi': 'saturday',
    'dimanche': 'sunday'
  };
  
  const englishDay = dayMapping[dayOfWeek];
  const workingHours = barber.working_hours?.[englishDay];
  
  if (!workingHours || !workingHours.working) {
    console.log('🔍 [AvailabilityController] Barber not working on', dayOfWeek);
    return slots;
  }

  const startTime = workingHours.start;
  const endTime = workingHours.end;
  
  // Convertir les heures en minutes pour faciliter les calculs
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  
  // Générer des créneaux de 30 minutes
  for (let minutes = startMinutes; minutes < endMinutes; minutes += 30) {
    const timeString = minutesToTime(minutes);
    const slotDateTime = new Date(appointmentDate);
    const [hours, mins] = timeString.split(':').map(Number);
    slotDateTime.setHours(hours, mins, 0, 0);
    
    slots.push({
      id: `${barber.id}-${date}-${timeString}`,
      time: timeString,
      date: date,
      barberId: barber.id,
      barberName: `${barber.first_name} ${barber.last_name}`,
      available: true,
      slotDateTime: slotDateTime.toISOString()
    });
  }
  
  return slots;
}

/**
 * Convertir une heure (HH:MM) en minutes
 */
function timeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Convertir des minutes en heure (HH:MM)
 */
function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

module.exports = AvailabilityController;
