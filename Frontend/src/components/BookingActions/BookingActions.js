import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEye, FaEdit } from 'react-icons/fa';
import { adminAPI } from '../../services/api';
import { toast } from 'react-toastify';
import {
  ActionsContainer,
  ActionButton,
  ConfirmButton,
  CancelButton,
  ViewButton,
  EditButton,
  ConfirmationModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalActions,
  CancelReasonInput,
  StatusBadge
} from './BookingActions.styles';

const BookingActions = ({ booking, onStatusUpdate, onView, onEdit }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setLoading(true);
      await adminAPI.updateBookingStatus(booking.id, newStatus, cancellationReason);
      toast.success(`Réservation ${getStatusText(newStatus)} avec succès`);
      onStatusUpdate(booking.id, newStatus);
      setShowConfirmModal(false);
      setShowCancelModal(false);
      setCancellationReason('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      toast.error('Erreur lors de la mise à jour du statut');
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      'confirmed': 'confirmée',
      'cancelled': 'annulée',
      'completed': 'terminée',
      'no_show': 'marquée comme absence'
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status) => {
    const colorMap = {
      'pending': '#f39c12',
      'confirmed': '#27ae60',
      'cancelled': '#e74c3c',
      'completed': '#3498db',
      'no_show': '#95a5a6'
    };
    return colorMap[status] || '#95a5a6';
  };

  const canConfirm = booking.status === 'pending';
  const canCancel = ['pending', 'confirmed'].includes(booking.status);
  const canComplete = booking.status === 'confirmed';

  return (
    <>
      <ActionsContainer>
        <StatusBadge color={getStatusColor(booking.status)}>
          {getStatusText(booking.status)}
        </StatusBadge>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {onView && (
            <ViewButton onClick={() => onView(booking)}>
              <FaEye />
            </ViewButton>
          )}
          
          {onEdit && (
            <EditButton onClick={() => onEdit(booking)}>
              <FaEdit />
            </EditButton>
          )}
          
          {canConfirm && (
            <ConfirmButton 
              onClick={() => setShowConfirmModal(true)}
              disabled={loading}
            >
              <FaCheck />
            </ConfirmButton>
          )}
          
          {canCancel && (
            <CancelButton 
              onClick={() => setShowCancelModal(true)}
              disabled={loading}
            >
              <FaTimes />
            </CancelButton>
          )}
        </div>
      </ActionsContainer>

      {/* Modal de confirmation */}
      {showConfirmModal && (
        <ConfirmationModal>
          <ModalOverlay onClick={() => setShowConfirmModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Confirmer la réservation</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p>Êtes-vous sûr de vouloir confirmer cette réservation ?</p>
                <p><strong>{booking.customerFirstName} {booking.customerLastName}</strong></p>
                <p>{booking.appointmentDate} à {booking.appointmentTime}</p>
              </ModalBody>
              <ModalActions>
                <ActionButton onClick={() => setShowConfirmModal(false)}>
                  Annuler
                </ActionButton>
                <ConfirmButton 
                  onClick={() => handleStatusUpdate('confirmed')}
                  disabled={loading}
                >
                  {loading ? 'Confirmation...' : 'Confirmer'}
                </ConfirmButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        </ConfirmationModal>
      )}

      {/* Modal d'annulation */}
      {showCancelModal && (
        <ConfirmationModal>
          <ModalOverlay onClick={() => setShowCancelModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Annuler la réservation</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p>Êtes-vous sûr de vouloir annuler cette réservation ?</p>
                <p><strong>{booking.customerFirstName} {booking.customerLastName}</strong></p>
                <p>{booking.appointmentDate} à {booking.appointmentTime}</p>
                
                <CancelReasonInput
                  placeholder="Raison de l'annulation (optionnel)"
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                />
              </ModalBody>
              <ModalActions>
                <ActionButton onClick={() => setShowCancelModal(false)}>
                  Annuler
                </ActionButton>
                <CancelButton 
                  onClick={() => handleStatusUpdate('cancelled')}
                  disabled={loading}
                >
                  {loading ? 'Annulation...' : 'Annuler la réservation'}
                </CancelButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        </ConfirmationModal>
      )}
    </>
  );
};

export default BookingActions;
