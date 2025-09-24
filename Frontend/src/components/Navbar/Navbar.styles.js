import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${props => props.isScrolled ? 'rgba(26, 26, 26, 0.95)' : 'rgba(26, 26, 26, 0.9)'};
  backdrop-filter: blur(10px);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: ${props => props.isScrolled ? '1px solid rgba(212, 175, 55, 0.3)' : 'none'};
  min-height: ${props => props.isExtending ? '120px' : '80px'};
  
  @media (max-width: 768px) {
    min-height: ${props => props.isExtending ? '100px' : '70px'};
  }
`;

export const NavbarWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${props => props.isExtending ? '120px' : '80px'};
  transition: height 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    padding: 0 15px;
    height: ${props => props.isExtending ? '100px' : '70px'};
  }
`;

export const Logo = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: white;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  
  span:first-child {
    color: #d4af37;
    font-size: 1.4rem;
  }
  
  span:last-child {
    color: white;
    font-size: 0.9rem;
    letter-spacing: 2px;
  }
  
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 992px) {
    display: none;
  }
`;

export const NavLink = styled(Link).attrs(props => ({
  $isActive: props.isActive
}))`
  color: ${props => props.$isActive ? '#d4af37' : 'white'};
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background: #d4af37;
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: #d4af37;
    
    &::after {
      width: 100%;
    }
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: white;
  font-size: 0.9rem;
  
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  svg {
    color: #d4af37;
    font-size: 0.8rem;
  }
  
  @media (max-width: 992px) {
    display: none;
  }
`;

export const CTAButton = styled(Link)`
  background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
  color: #1a1a1a;
  padding: 12px 24px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
  }
  
  @media (max-width: 992px) {
    display: none;
  }
`;

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (max-width: 992px) {
    display: block;
  }
`;

export const MobileMenu = styled(motion.div)`
  display: none;
  background: rgba(26, 26, 26, 0.98);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-top: 1px solid rgba(212, 175, 55, 0.3);
  
  @media (max-width: 992px) {
    display: block;
  }
`;

export const MobileNavLink = styled(Link).attrs(props => ({
  $isActive: props.isActive,
  $isCTA: props.isCTA
}))`
  display: block;
  color: ${props => props.$isActive ? '#d4af37' : 'white'};
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:last-child {
    border-bottom: none;
    margin-top: 1rem;
    padding: 1rem;
    background: ${props => props.$isCTA ? 'linear-gradient(135deg, #d4af37 0%, #f4d03f 100%)' : 'transparent'};
    color: ${props => props.$isCTA ? '#1a1a1a' : 'white'};
    text-align: center;
    border-radius: 50px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  &:hover {
    color: #d4af37;
    padding-left: 1rem;
  }
  
  &:last-child:hover {
    padding-left: 1rem;
    transform: translateY(-2px);
  }
`;

