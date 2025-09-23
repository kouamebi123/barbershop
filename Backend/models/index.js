const { sequelize } = require('../config/database');
const Location = require('./Location');
const Service = require('./Service');
const Booking = require('./Booking');
const Admin = require('./Admin');
const Testimonial = require('./Testimonial');

// Modèles de liaison
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

// Service -> Location (Many-to-One) - Services disponibles par location
Service.belongsTo(Location, { 
  foreignKey: 'locationId',
  as: 'location'
});
Location.hasMany(Service, { 
  foreignKey: 'locationId',
  as: 'services'
});

module.exports = {
  sequelize,
  Location,
  Service,
  Booking,
  Admin,
  Testimonial,
  BookingService
};