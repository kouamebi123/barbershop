import styled from 'styled-components';

export const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: #fff;
  color: #666;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
    border-color: #ccc;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ConfirmButton = styled(ActionButton)`
  background: #27ae60;
  color: white;
  border-color: #27ae60;
  
  &:hover:not(:disabled) {
    background: #229954;
    border-color: #229954;
  }
`;

export const CancelButton = styled(ActionButton)`
  background: #e74c3c;
  color: white;
  border-color: #e74c3c;
  
  &:hover:not(:disabled) {
    background: #c0392b;
    border-color: #c0392b;
  }
`;

export const ViewButton = styled(ActionButton)`
  background: #3498db;
  color: white;
  border-color: #3498db;
  padding: 8px;
  min-width: 36px;
  
  &:hover:not(:disabled) {
    background: #2980b9;
    border-color: #2980b9;
  }
`;

export const EditButton = styled(ActionButton)`
  background: #f39c12;
  color: white;
  border-color: #f39c12;
  padding: 8px;
  min-width: 36px;
  
  &:hover:not(:disabled) {
    background: #e67e22;
    border-color: #e67e22;
  }
`;

export const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => props.color}20;
  color: ${props => props.color};
  border: 1px solid ${props => props.color}40;
`;

export const ConfirmationModal = styled.div`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 9999 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 !important;
  padding: 0 !important;
`;

export const ModalOverlay = styled.div`
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background: rgba(0, 0, 0, 0.15);
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 20px;
  backdrop-filter: blur(2px);
  margin: 0 !important;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  padding: 24px 24px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 20px;
  font-weight: 600;
  color: #2c3e50;
`;

export const ModalBody = styled.div`
  padding: 0 24px;
  
  p {
    margin: 0 0 12px 0;
    color: #555;
    line-height: 1.5;
  }
`;

export const ModalActions = styled.div`
  padding: 20px 24px 24px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  border-top: 1px solid #eee;
  margin-top: 20px;
`;

export const ModalConfirmButton = styled(ActionButton)`
  background: #27ae60;
  color: white;
  border-color: #27ae60;
  padding: 12px 24px;
  font-weight: 600;
  
  &:hover:not(:disabled) {
    background: #229954;
    border-color: #229954;
  }
`;

export const CancelReasonInput = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 80px;
  margin-top: 12px;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;
