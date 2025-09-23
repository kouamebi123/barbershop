const express = require('express');
const { Service, Location } = require('../models');
const router = express.Router();

// Récupérer tous les genres disponibles
router.get('/genders', async (req, res) => {
  try {
    const genders = [
      { id: 'homme', name: 'Homme', icon: '👨' },
      { id: 'femme', name: 'Femme', icon: '👩' }
    ];
    
    res.json({
      success: true,
      data: { genders }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des genres:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des genres'
    });
  }
});

// Récupérer les types de coupes par genre
router.get('/haircut-types/:gender', async (req, res) => {
  try {
    const { gender } = req.params;
    
    const haircutTypes = await Service.findAll({
      where: {
        gender: [gender, 'unisex'],
        isActive: true
      },
      attributes: ['haircut_type'],
      group: ['haircut_type'],
      raw: true
    });

    const types = haircutTypes.map(item => ({
      id: item.haircut_type,
      name: getHaircutTypeName(item.haircut_type),
      icon: getHaircutTypeIcon(item.haircut_type)
    }));

    res.json({
      success: true,
      data: { haircutTypes: types }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des types de coupes:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des types de coupes'
    });
  }
});

// Récupérer les services par genre et type de coupe
router.get('/services/:gender/:haircutType', async (req, res) => {
  try {
    const { gender, haircutType } = req.params;
    
    const services = await Service.findAll({
      where: {
        gender: [gender, 'unisex'],
        haircut_type: haircutType,
        isActive: true
      },
      order: [['price', 'ASC']]
    });

    res.json({
      success: true,
      data: { services }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des services:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des services'
    });
  }
});

// Récupérer les salons qui supportent un genre et un type de coupe
router.get('/locations/:gender/:haircutType', async (req, res) => {
  try {
    const { gender, haircutType } = req.params;
    
    // Trouver les services disponibles pour ce genre et type de coupe
    const services = await Service.findAll({
      where: {
        gender: [gender, 'unisex'],
        haircut_type: haircutType,
        isActive: true
      },
      include: [{
        model: Location,
        as: 'location',
        where: {
          isActive: true,
          supported_genders: {
            [require('sequelize').Op.contains]: [gender]
          }
        },
        required: true
      }]
    });

    // Extraire les salons uniques
    const locations = services.map(service => service.location).filter((location, index, self) => 
      index === self.findIndex(l => l.id === location.id)
    );

    res.json({
      success: true,
      data: { locations }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des salons:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des salons'
    });
  }
});


// Fonctions utilitaires
function getHaircutTypeName(type) {
  const names = {
    'coupe_homme': 'Coupes Homme',
    'coupe_femme': 'Coupes Femme',
    'coupe_unisex': 'Coupes Unisex',
    'barbe': 'Barbe & Rasage',
    'coloration': 'Coloration',
    'soin': 'Soins'
  };
  return names[type] || type;
}

function getHaircutTypeIcon(type) {
  const icons = {
    'coupe_homme': '✂️',
    'coupe_femme': '💇‍♀️',
    'coupe_unisex': '💇',
    'barbe': '🧔',
    'coloration': '🎨',
    'soin': '🧴'
  };
  return icons[type] || '✂️';
}

module.exports = router;
