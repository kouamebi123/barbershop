const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Barber = sequelize.define('Barber', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 50]
    }
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      is: /^[\+]?[0-9\s\-\(\)]+$/
    }
  },
  specializations: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    comment: 'Spécialisations du coiffeur'
  },
  experience: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Années d\'expérience',
    validate: {
      min: 0,
      max: 50
    }
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  avatarUrl: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  workingHours: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: {
      monday: { start: '09:00', end: '19:00', working: true },
      tuesday: { start: '09:00', end: '19:00', working: true },
      wednesday: { start: '09:00', end: '19:00', working: true },
      thursday: { start: '09:00', end: '19:00', working: true },
      friday: { start: '09:00', end: '19:00', working: true },
      saturday: { start: '09:00', end: '18:00', working: true },
      sunday: { start: '10:00', end: '16:00', working: false }
    }
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  totalBookings: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'barbers',
  indexes: [
    {
      fields: ['is_active']
    },
    {
      fields: ['rating']
    }
  ]
});

module.exports = Barber;
