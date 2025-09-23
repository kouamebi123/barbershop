const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  customerFirstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  },
  customerLastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 50]
    }
  },
  customerEmail: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Format d\'email invalide'
      }
    }
  },
  customerPhone: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      is: {
        args: /^[\+]?[0-9\s\-\(\)]+$/,
        msg: 'Format de téléphone invalide (seuls les chiffres, espaces, tirets, parenthèses et + sont autorisés)'
      }
    }
  },
  appointmentDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  appointmentTime: {
    type: DataTypes.TIME,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no_show'),
    defaultValue: 'pending'
  },
  totalPrice: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Durée totale en minutes'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reminderSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  confirmationSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  cancellationReason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  bookingReference: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  locationId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'locations',
      key: 'id'
    }
  }
}, {
  tableName: 'bookings',
  indexes: [
    {
      fields: ['appointment_date', 'appointment_time']
    },
    {
      fields: ['status']
    },
    {
      fields: ['customer_email']
    },
    {
      fields: ['booking_reference']
    }
  ]
});

module.exports = Booking;
