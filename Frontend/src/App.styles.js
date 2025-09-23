import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  color: #1a1a1a;
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const Section = styled.section`
  padding: 80px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1rem;
  color: #1a1a1a;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: #666;
  max-width: 600px;
  margin: 0 auto 3rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(26, 26, 26, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 0.9rem;
  }
`;

export const ButtonSecondary = styled(Button)`
  background: transparent;
  color: #1a1a1a;
  border: 2px solid #1a1a1a;
  
  &:hover {
    background: #1a1a1a;
    color: white;
  }
`;

export const ButtonGold = styled(Button)`
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  color: #1a1a1a;
  
  &:hover {
    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: ${props => props.align || 'center'};
  justify-content: ${props => props.justify || 'center'};
  gap: ${props => props.gap || '1rem'};
  flex-direction: ${props => props.direction || 'row'};
  
  @media (max-width: 768px) {
    flex-direction: ${props => props.mobileDirection || props.direction || 'column'};
  }
`;

export const Text = styled.p`
  font-size: ${props => props.size || '1rem'};
  color: ${props => props.color || '#666'};
  margin: ${props => props.margin || '0'};
  text-align: ${props => props.align || 'left'};
  line-height: ${props => props.lineHeight || '1.6'};
`;

export const Heading = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: ${props => props.size || '2.5rem'};
  font-weight: ${props => props.weight || '600'};
  color: ${props => props.color || '#1a1a1a'};
  margin: ${props => props.margin || '0 0 1rem'};
  text-align: ${props => props.align || 'left'};
  line-height: ${props => props.lineHeight || '1.2'};
  
  @media (max-width: 768px) {
    font-size: ${props => props.mobileSize || props.size || '2rem'};
  }
`;

export const Spacer = styled.div`
  height: ${props => props.height || '2rem'};
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ddd, transparent);
  margin: 2rem 0;
`;

export const Badge = styled.span`
  background: ${props => props.bg || '#1a1a1a'};
  color: ${props => props.color || 'white'};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #fcc;
  margin: 1rem 0;
`;

export const SuccessMessage = styled.div`
  background: #efe;
  color: #3c3;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #cfc;
  margin: 1rem 0;
`;

