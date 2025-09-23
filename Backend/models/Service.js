const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Durée en minutes',
    validate: {
      min: 15,
      max: 300
    }
  },
  category: {
    type: DataTypes.ENUM('coupe', 'barbe', 'soins', 'combo', 'coloration'),
    allowNull: false,
    defaultValue: 'coupe'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  imageUrl: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  maxConcurrentBookings: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 10
    }
  },
  gender: {
    type: DataTypes.ENUM('homme', 'femme', 'unisex'),
    allowNull: false,
    defaultValue: 'unisex'
  },
  haircut_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'Type de coupe: coupe_homme, coupe_femme, coupe_unisex, barbe, coloration, soin'
  }
}, {
  tableName: 'services',
  indexes: [
    {
      fields: ['category', 'is_active']
    },
    {
      fields: ['price']
    }
  ]
});

module.exports = Service;
