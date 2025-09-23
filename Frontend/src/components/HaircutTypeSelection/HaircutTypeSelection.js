import React from 'react';
import { motion } from 'framer-motion';

import {
  HaircutTypeContainer,
  HaircutTypeTitle,
  HaircutTypeSubtitle,
  HaircutTypeGrid,
  HaircutTypeCard,
  HaircutTypeIcon,
  HaircutTypeName,
  HaircutTypeDescription
} from './HaircutTypeSelection.styles';

const HaircutTypeSelection = ({ 
  gender, 
  haircutTypes, 
  onHaircutTypeSelect, 
  selectedHaircutType 
}) => {
  if (!haircutTypes || haircutTypes.length === 0) {
    return (
      <HaircutTypeContainer>
        <HaircutTypeTitle>Aucun type de coupe disponible</HaircutTypeTitle>
        <HaircutTypeSubtitle>
          Aucun service n'est disponible pour ce genre.
        </HaircutTypeSubtitle>
      </HaircutTypeContainer>
    );
  }

  return (
    <HaircutTypeContainer>
      <HaircutTypeTitle>Choisissez votre type de coupe</HaircutTypeTitle>
      <HaircutTypeGrid>
        {haircutTypes.map((type) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HaircutTypeCard
              onClick={() => onHaircutTypeSelect(type.id)}
              $isSelected={selectedHaircutType === type.id}
            >
              <HaircutTypeIcon>
                {type.icon}
              </HaircutTypeIcon>
              <HaircutTypeName>{type.name}</HaircutTypeName>
              <HaircutTypeDescription>
                {getHaircutTypeDescription(type.id)}
              </HaircutTypeDescription>
            </HaircutTypeCard>
          </motion.div>
        ))}
      </HaircutTypeGrid>
    </HaircutTypeContainer>
  );
};

// Fonction pour obtenir la description du type de coupe
function getHaircutTypeDescription(typeId) {
  const descriptions = {
    'coupe_homme': 'Coupes courtes, dégradés, fades et styles modernes',
    'coupe_femme': 'Coupes longues, courtes, balayages et styles tendance',
    'coupe_unisex': 'Coupes adaptées à tous les genres et styles',
    'barbe': 'Taille de barbe, rasage traditionnel et entretien',
    'coloration': 'Balayages, colorations et techniques modernes',
    'soin': 'Shampooings, masques et soins capillaires'
  };
  return descriptions[typeId] || 'Service de coiffure professionnel';
}

export default HaircutTypeSelection;
