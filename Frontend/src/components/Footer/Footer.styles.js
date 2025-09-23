import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 4rem 0 0;
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

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FooterTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #d4af37;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1rem;
  line-height: 1.6;

  &:hover {
    color: #d4af37;
  }
`;

export const FooterText = styled.p`
  color: #ccc;
  line-height: 1.6;
  font-size: 1rem;
  margin: 0;
`;

export const FooterIcon = styled.div`
  color: #d4af37;
  font-size: 1.2rem;
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
`;

export const FooterBottom = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(212, 175, 55, 0.2);
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`;

export const FooterCopyright = styled.p`
  color: #999;
  font-size: 0.9rem;
  margin: 0;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(212, 175, 55, 0.1);
  color: #d4af37;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: #d4af37;
    color: #1a1a1a;
    transform: translateY(-3px);
  }
`;

export const BackToTop = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #d4af37, #e0c26f);
  color: #1a1a1a;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.4);
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const QuickLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const QuickLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1rem;
  line-height: 1.6;

  &:hover {
    color: #d4af37;
  }
`;

export const NewsletterSection = styled.div`
  background: rgba(212, 175, 55, 0.1);
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  border: 1px solid rgba(212, 175, 55, 0.2);
  margin-bottom: 2rem;
`;

export const NewsletterTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #d4af37;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const NewsletterDescription = styled.p`
  color: #ccc;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

export const NewsletterForm = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

export const NewsletterInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid rgba(212, 175, 55, 0.3);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #d4af37;
    background: rgba(255, 255, 255, 0.15);
  }

  &::placeholder {
    color: #999;
  }
`;

export const NewsletterButton = styled.button`
  background: linear-gradient(135deg, #d4af37, #e0c26f);
  color: #1a1a1a;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  white-space: nowrap;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(212, 175, 55, 0.3);
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;