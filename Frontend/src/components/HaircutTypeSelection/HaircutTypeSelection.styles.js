import styled from 'styled-components';

export const HaircutTypeContainer = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

export const HaircutTypeTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const HaircutTypeSubtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
`;

export const HaircutTypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const HaircutTypeCard = styled.div`
  background: white;
  border: 2px solid ${props => props.$isSelected ? '#d4af37' : '#e5e7eb'};
  border-radius: 15px;
  padding: 30px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    border-color: #d4af37;
    box-shadow: 0 8px 25px rgba(212, 175, 55, 0.15);
    transform: translateY(-3px);
  }
  
  ${props => props.$isSelected && `
    background: linear-gradient(135deg, #d4af3715, #d4af3705);
    box-shadow: 0 8px 25px #d4af3730;
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #d4af37;
    opacity: ${props => props.$isSelected ? 1 : 0};
    transition: opacity 0.3s ease;
  }
`;

export const HaircutTypeIcon = styled.div`
  width: 60px;
  height: 60px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: 24px;
  transition: all 0.3s ease;
  
  ${HaircutTypeCard}:hover & {
    background: #d4af37;
    color: white;
    transform: scale(1.1);
  }
`;

export const HaircutTypeName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

export const HaircutTypeDescription = styled.p`
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  margin: 0;
`;
