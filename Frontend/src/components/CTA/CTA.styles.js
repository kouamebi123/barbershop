import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Section = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="0.5" fill="%23d4af37" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const Content = styled.div`
  text-align: center;
`;

export const TextContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.h3`
  font-size: 1.5rem;
  color: #d4af37;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const Description = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Button = styled(Link)`
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  color: #1a1a1a;
  padding: 18px 36px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(212, 175, 55, 0.4);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg:last-child {
    transform: translateX(5px);
  }
  
  @media (max-width: 768px) {
    padding: 15px 30px;
    font-size: 1rem;
  }
`;

export const ButtonSecondary = styled(Link)`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 16px 32px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #1a1a1a;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 1rem;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  font-size: 1.1rem;
  
  svg {
    color: #d4af37;
    font-size: 1rem;
  }
`;

