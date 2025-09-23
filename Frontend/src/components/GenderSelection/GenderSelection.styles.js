import styled from 'styled-components';

export const GenderContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

export const GenderTitle = styled.h2`
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const GenderSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

export const GenderGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 600px;
  margin: 0 auto;
`;

export const GenderCard = styled.div`
  background: white;
  border: 3px solid ${props => props.$isSelected ? props.$color : '#e5e7eb'};
  border-radius: 20px;
  padding: 40px 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: ${props => props.$color};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-5px);
  }
  
  ${props => props.$isSelected && `
    background: linear-gradient(135deg, ${props.$color}15, ${props.$color}05);
    box-shadow: 0 10px 30px ${props.$color}30;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => props.$color};
    opacity: ${props => props.$isSelected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

export const GenderIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${props => props.$color}20;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 32px;
  color: ${props => props.$color};
  transition: all 0.3s ease;
  
  ${GenderCard}:hover & {
    background: ${props => props.$color};
    color: white;
    transform: scale(1.1);
  }
`;

export const GenderName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
`;

export const GenderDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
`;
