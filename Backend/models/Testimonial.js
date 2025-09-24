const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Testimonial = sequelize.define('Testimonial', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    customerName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      }
    },
    customerEmail: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
        len: [5, 255]
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 1000]
      }
    },
    serviceId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'services',
        key: 'id'
      }
    },
    locationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'locations',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    adminNotes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    verifiedBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'admins',
        key: 'id'
      }
    }
  }, {
    tableName: 'testimonials',
    timestamps: true,
    indexes: [
      {
        fields: ['status']
      },
      {
        fields: ['rating']
      },
      {
        fields: ['serviceId']
      },
      {
        fields: ['locationId']
      },
    ]
  });

  return Testimonial;
};
