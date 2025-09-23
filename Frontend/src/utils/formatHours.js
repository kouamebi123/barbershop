// Fonction utilitaire pour formater les horaires d'ouverture
export const formatOpeningHours = (openingHours) => {
  if (!openingHours) return 'Horaires non disponibles';

  const days = {
    monday: 'Lun',
    tuesday: 'Mar', 
    wednesday: 'Mer',
    thursday: 'Jeu',
    friday: 'Ven',
    saturday: 'Sam',
    sunday: 'Dim'
  };

  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const weekend = ['saturday', 'sunday'];

  // Vérifier si tous les jours de semaine ont les mêmes horaires
  const weekdayHours = weekdays.map(day => openingHours[day]);
  const isWeekdayUniform = weekdayHours.every(day => 
    day && day.open === weekdayHours[0].open && day.close === weekdayHours[0].close
  );

  // Vérifier si le samedi a des horaires différents
  const saturday = openingHours.saturday;
  const sunday = openingHours.sunday;

  if (isWeekdayUniform && weekdayHours[0]) {
    const weekdayOpen = weekdayHours[0].open;
    const weekdayClose = weekdayHours[0].close;
    
    let result = `Lun-Ven ${weekdayOpen}-${weekdayClose}`;
    
    if (saturday && !saturday.closed) {
      result += `, Sam ${saturday.open}-${saturday.close}`;
    }
    
    if (sunday && !sunday.closed) {
      result += `, Dim ${sunday.open}-${sunday.close}`;
    } else if (sunday && sunday.closed) {
      result += ', Dim fermé';
    }
    
    return result;
  }

  // Si les horaires ne sont pas uniformes, afficher un résumé simple
  const openDays = Object.keys(openingHours).filter(day => 
    openingHours[day] && !openingHours[day].closed
  );

  if (openDays.length === 0) return 'Fermé';

  const firstDay = openDays[0];
  const lastDay = openDays[openDays.length - 1];
  
  return `${days[firstDay]}-${days[lastDay]} ${openingHours[firstDay].open}-${openingHours[firstDay].close}`;
};

// Fonction pour obtenir les horaires du jour actuel
export const getTodayHours = (openingHours) => {
  if (!openingHours) return 'Horaires non disponibles';

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' }).toLowerCase();
  const dayKey = today === 'lundi' ? 'monday' :
                 today === 'mardi' ? 'tuesday' :
                 today === 'mercredi' ? 'wednesday' :
                 today === 'jeudi' ? 'thursday' :
                 today === 'vendredi' ? 'friday' :
                 today === 'samedi' ? 'saturday' :
                 today === 'dimanche' ? 'sunday' : null;

  if (!dayKey || !openingHours[dayKey]) return 'Fermé aujourd\'hui';

  const day = openingHours[dayKey];
  if (day.closed) return 'Fermé aujourd\'hui';

  return `Ouvert aujourd'hui ${day.open}-${day.close}`;
};
