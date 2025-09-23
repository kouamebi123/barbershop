import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

export const ModalContainer = styled(motion.div)`
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  margin: 20px;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 40px 30px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 24px 24px 0 0;
`;

export const ModalTitle = styled.h2`
  font-size: 28px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  text-align: center;
  flex: 1;
`;

export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    color: #333;
  }
`;

export const ModalContent = styled.div`
  padding: 40px;
  text-align: center;
`;

export const ConfirmationIcon = styled.div`
  font-size: 80px;
  color: #28a745;
  margin: 30px 0;
  display: flex;
  justify-content: center;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

export const ConfirmationTitle = styled.h3`
  font-size: 32px;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 20px;
  background: linear-gradient(135deg, #d4af37, #b8941f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const ConfirmationMessage = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.7;
  margin: 0 0 40px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

export const BookingDetails = styled.div`
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  border-radius: 20px;
  padding: 35px;
  margin: 40px 0;
  text-align: left;
  border: 1px solid #e9ecef;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
`;

export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  padding: 15px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const DetailIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #d4af37, #b8941f);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  margin-right: 20px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
`;

export const DetailLabel = styled.div`
  font-size: 15px;
  color: #666;
  font-weight: 600;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const DetailValue = styled.div`
  font-size: 18px;
  color: #1a1a1a;
  font-weight: 700;
  line-height: 1.3;
`;

export const ModalActions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const ActionButton = styled.button`
  flex: 1;
  padding: 15px 25px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
`;

export const PrimaryButton = styled(ActionButton)`
  background: #d4af37;
  color: white;
  
  &:hover {
    background: #b8941f;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
  }
`;

export const SecondaryButton = styled(ActionButton)`
  background: #f8f9fa;
  color: #666;
  border: 2px solid #e9ecef;
  
  &:hover {
    background: #e9ecef;
    color: #333;
    transform: translateY(-2px);
  }
`;
