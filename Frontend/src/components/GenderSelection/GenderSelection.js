import React from 'react';
import { motion } from 'framer-motion';
import { FaMale, FaFemale } from 'react-icons/fa';

import {
  GenderContainer,
  GenderTitle,
  GenderSubtitle,
  GenderGrid,
  GenderCard,
  GenderIcon,
  GenderName,
  GenderDescription
} from './GenderSelection.styles';

const GenderSelection = ({ onGenderSelect, selectedGender }) => {
  const genders = [
    {
      id: 'homme',
      name: 'Homme',
      icon: <FaMale />,
      description: 'Coupes, tailles de barbe et soins pour hommes',
      color: '#3B82F6'
    },
    {
      id: 'femme',
      name: 'Femme',
      icon: <FaFemale />,
      description: 'Coupes, colorations et soins pour femmes',
      color: '#EC4899'
    }
  ];

  return (
    <GenderContainer>
      <GenderTitle>Choisissez votre genre</GenderTitle>
      <GenderSubtitle>
        Sélectionnez votre genre pour voir les services adaptés
      </GenderSubtitle>
      
      <GenderGrid>
        {genders.map((gender) => (
          <motion.div
            key={gender.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GenderCard
              onClick={() => onGenderSelect(gender.id)}
              $isSelected={selectedGender === gender.id}
              $color={gender.color}
            >
              <GenderIcon $color={gender.color}>
                {gender.icon}
              </GenderIcon>
              <GenderName>{gender.name}</GenderName>
              <GenderDescription>{gender.description}</GenderDescription>
            </GenderCard>
          </motion.div>
        ))}
      </GenderGrid>
    </GenderContainer>
  );
};

export default GenderSelection;
