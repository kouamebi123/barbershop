const { sequelize } = require('../config/database');
const BaseController = require('./BaseController');

class AvailabilityController extends BaseController {
  /**
   * Récupérer les créneaux disponibles pour un coiffeur à une date donnée
   */
  static async getAvailability(req, res) {
    try {
      const { locationId, date } = req.query;

      console.log('🔍 [AvailabilityController] getAvailability - Params:', { locationId, date });

      if (!locationId || !date) {
        return BaseController.error(res, 'Paramètres manquants', 400, 'locationId et date sont requis');
      }

      // Vérifier que la location existe
      const locationQuery = `
        SELECT * FROM locations 
        WHERE id = :locationId AND is_active = true
      `;

      const locationResult = await sequelize.query(locationQuery, {
        replacements: { locationId },
        type: sequelize.QueryTypes.SELECT
      });

      if (locationResult.length === 0) {
        return BaseController.error(res, 'Location non trouvée', 404, 'La location n\'existe pas ou est inactive');
      }

      const location = locationResult[0];
      console.log('🔍 [AvailabilityController] getAvailability - Location found:', location.name);
      console.log('🔍 [AvailabilityController] getAvailability - Opening hours:', location.opening_hours);

      // Parser les heures d'ouverture si c'est un JSON string
      let openingHours = location.opening_hours;
      if (typeof openingHours === 'string') {
        try {
          openingHours = JSON.parse(openingHours);
        } catch (e) {
          console.error('❌ [AvailabilityController] Error parsing opening_hours:', e);
          openingHours = {};
        }
      }

      // Générer les créneaux disponibles pour la date donnée
      console.log('🔍 [AvailabilityController] getAvailability - About to generate slots...');
      const availableSlots = generateAvailableSlots({ ...location, opening_hours: openingHours }, date);
      console.log('🔍 [AvailabilityController] getAvailability - Generated slots:', availableSlots.length);

      return BaseController.success(res, availableSlots, 'Créneaux disponibles récupérés avec succès');

    } catch (error) {
      console.error('❌ [AvailabilityController] getAvailability - Error:', error);
      return BaseController.error(res, 'Erreur lors de la récupération des créneaux', 500, error.message);
    }
  }
}

/**
 * Générer les créneaux disponibles pour une location
 */
function generateAvailableSlots(location, date) {
  try {
    console.log('🔍 [generateAvailableSlots] Starting with location:', location.name, 'date:', date);
    const slots = [];
    const appointmentDate = new Date(date);
    const dayOfWeek = appointmentDate.toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
    
    console.log('🔍 [generateAvailableSlots] Day of week:', dayOfWeek);
    
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
    console.log('🔍 [generateAvailableSlots] English day:', englishDay);
    console.log('🔍 [generateAvailableSlots] Opening hours:', location.opening_hours);
    
    const openingHours = location.opening_hours?.[englishDay];
    console.log('🔍 [generateAvailableSlots] Day opening hours:', openingHours);
    
    if (!openingHours || openingHours.closed) {
      console.log('🔍 [generateAvailableSlots] Location closed on', dayOfWeek);
      return slots;
    }

    const startTime = openingHours.open;
    const endTime = openingHours.close;
    console.log('🔍 [generateAvailableSlots] Start time:', startTime, 'End time:', endTime);
    
    // Convertir les heures en minutes pour faciliter les calculs
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);
    console.log('🔍 [generateAvailableSlots] Start minutes:', startMinutes, 'End minutes:', endMinutes);
    
    // Générer des créneaux de 30 minutes
    for (let minutes = startMinutes; minutes < endMinutes; minutes += 30) {
      const timeString = minutesToTime(minutes);
      const slotDateTime = new Date(appointmentDate);
      const [hours, mins] = timeString.split(':').map(Number);
      slotDateTime.setHours(hours, mins, 0, 0);
      
      slots.push({
        id: `${location.id}-${date}-${timeString}`,
        time: timeString,
        date: date,
        locationId: location.id,
        locationName: location.name,
        available: true,
        slotDateTime: slotDateTime.toISOString()
      });
    }
    
    console.log('🔍 [generateAvailableSlots] Generated', slots.length, 'slots');
    return slots;
  } catch (error) {
    console.error('❌ [generateAvailableSlots] Error:', error);
    return [];
  }
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
