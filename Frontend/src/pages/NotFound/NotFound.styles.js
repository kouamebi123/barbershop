import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const NotFoundContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23d4af37" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
`;

export const NotFoundContent = styled.div`
  text-align: center;
  color: white;
  max-width: 600px;
  position: relative;
  z-index: 1;
`;

export const NotFoundIcon = styled.div`
  font-size: 4rem;
  color: #d4af37;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 50%;
  margin: 0 auto 2rem;
  border: 2px solid rgba(212, 175, 55, 0.3);

  @media (max-width: 768px) {
    font-size: 3rem;
    width: 80px;
    height: 80px;
  }
`;

export const NotFoundTitle = styled.h1`
  font-size: 8rem;
  font-weight: 900;
  color: #d4af37;
  margin: 0;
  text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
  line-height: 1;

  @media (max-width: 768px) {
    font-size: 6rem;
  }

  @media (max-width: 480px) {
    font-size: 4rem;
  }
`;

export const NotFoundSubtitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 1rem 0;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const NotFoundDescription = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

export const NotFoundActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Button = styled(Link)`
  background: linear-gradient(135deg, #d4af37, #e0c26f);
  color: #1a1a1a;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.4);
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
`;

export const ButtonSecondary = styled.button`
  background: transparent;
  color: #d4af37;
  border: 2px solid #d4af37;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;

  &:hover {
    background: #d4af37;
    color: #1a1a1a;
    transform: translateY(-3px);
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
`;

export const SearchSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(212, 175, 55, 0.2);
`;

export const SearchTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #d4af37;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const SearchSuggestions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

export const SuggestionItem = styled.div`
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

export const SuggestionLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(212, 175, 55, 0.2);
    border-color: #d4af37;
    color: #d4af37;
  }

  svg {
    font-size: 1rem;
    opacity: 0.7;
  }
`;