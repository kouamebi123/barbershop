const { sequelize } = require('../config/database');
const Location = require('./Location');
const Service = require('./Service');
const Barber = require('./Barber');
const Booking = require('./Booking');
const Admin = require('./Admin');
const Testimonial = require('./Testimonial');

// Modèles de liaison
const BarberLocation = sequelize.define('BarberLocation', {
  id: {
    type: require('sequelize').DataTypes.UUID,
    defaultValue: require('sequelize').DataTypes.UUIDV4,
    primaryKey: true
  }
}, {
  tableName: 'barber_locations'
});

const BookingService = sequelize.define('BookingService', {
  id: {
    type: require('sequelize').DataTypes.UUID,
    defaultValue: require('sequelize').DataTypes.UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: require('sequelize').DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
}, {
  tableName: 'booking_services'
});

// Associations
// Barber <-> Location (Many-to-Many)
Barber.belongsToMany(Location, { 
  through: BarberLocation, 
  foreignKey: 'barberId',
  as: 'locations'
});
Location.belongsToMany(Barber, { 
  through: BarberLocation, 
  foreignKey: 'locationId',
  as: 'barbers'
});

// Booking <-> Service (Many-to-Many)
Booking.belongsToMany(Service, { 
  through: BookingService, 
  foreignKey: 'bookingId',
  as: 'services'
});
Service.belongsToMany(Booking, { 
  through: BookingService, 
  foreignKey: 'serviceId',
  as: 'bookings'
});

// Booking -> Location (Many-to-One)
Booking.belongsTo(Location, { 
  foreignKey: 'locationId',
  as: 'location'
});
Location.hasMany(Booking, { 
  foreignKey: 'locationId',
  as: 'bookings'
});

// Booking -> Barber (Many-to-One)
Booking.belongsTo(Barber, { 
  foreignKey: 'barberId',
  as: 'barber'
});
Barber.hasMany(Booking, { 
  foreignKey: 'barberId',
  as: 'bookings'
});

// Service -> Location (Many-to-One) - Services disponibles par location
Service.belongsTo(Location, { 
  foreignKey: 'locationId',
  as: 'location'
});
Location.hasMany(Service, { 
  foreignKey: 'locationId',
  as: 'services'
});

// Testimonial associations (après la définition des modèles)
// Ces associations seront définies après l'initialisation des modèles

module.exports = {
  sequelize,
  Location,
  Service,
  Barber,
  Booking,
  Admin,
  Testimonial,
  BarberLocation,
  BookingService
};

// Associations pour Testimonial (définies après l'export pour éviter les erreurs de dépendance circulaire)
// Ces associations seront définies dans le contrôleur si nécessaire
