import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
  
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
  color: #666;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

export const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FeatureIcon = styled.div`
  font-size: 1.5rem;
  color: #d4af37;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 50%;
`;

export const FeatureText = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: #1a1a1a;
`;

export const Button = styled(Link)`
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(26, 26, 26, 0.3);
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(5px);
  }
`;

export const ImageContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  .about-image-placeholder {
    width: 100%;
    max-width: 500px;
    height: 400px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, transparent 30%, rgba(212, 175, 55, 0.1) 50%, transparent 70%);
      animation: shimmer 3s infinite;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  }
  
  .image-content {
    text-align: center;
    z-index: 2;
    position: relative;
    padding: 2rem;
    
    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.1rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }
  
  @media (max-width: 768px) {
    .about-image-placeholder {
      height: 300px;
    }
    
    .image-content h3 {
      font-size: 1.5rem;
    }
    
    .image-content p {
      font-size: 1rem;
    }
  }
`;

