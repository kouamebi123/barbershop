import styled from 'styled-components';

export const HomeContainer = styled.div`
  padding-top: 80px;
`;

export const Section = styled.section`
  padding: 80px 0;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    padding: 0 15px;
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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

export const CardIcon = styled.div`
  font-size: 3rem;
  color: #d4af37;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

export const CardDescription = styled.p`
  color: #666;
  line-height: 1.6;
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
  
  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 0.9rem;
  }
`;

export const ButtonGold = styled(Button)`
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  color: #1a1a1a;
  
  &:hover {
    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
  }
`;

export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
`;

export const StatItem = styled.div`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

export const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #d4af37;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

