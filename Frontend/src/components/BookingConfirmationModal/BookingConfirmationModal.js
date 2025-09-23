import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalContent,
  ConfirmationIcon,
  ConfirmationTitle,
  ConfirmationMessage,
  ModalActions,
  PrimaryButton,
  SecondaryButton
} from './BookingConfirmationModal.styles';

const BookingConfirmationModal = ({ 
  isOpen, 
  onClose, 
  bookingData, 
  onNewBooking 
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>Réservation Confirmée !</ModalTitle>
              <ModalCloseButton onClick={onClose}>
                <FaTimes />
              </ModalCloseButton>
            </ModalHeader>

            <ModalContent>
              <ConfirmationIcon>
                <FaCheckCircle />
              </ConfirmationIcon>
              
              <ConfirmationTitle>Félicitations !</ConfirmationTitle>
              <ConfirmationMessage>
                Votre rendez-vous a été pris avec succès. Vous recevrez un email de confirmation dans les prochaines minutes.
              </ConfirmationMessage>

              <ModalActions>
                <SecondaryButton as={Link} to="/" onClick={onClose}>
                  Retour à l'accueil
                </SecondaryButton>
                <PrimaryButton onClick={onNewBooking}>
                  Nouvelle réservation
                </PrimaryButton>
              </ModalActions>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default BookingConfirmationModal;
