import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AdminNavbarContainer = styled.nav`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
  padding: 0 2rem;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 3px solid #d4af37;

  @media (max-width: 768px) {
    padding: 0 1rem;
    height: 60px;
  }
`;

export const NavbarBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 700;
  font-size: 1.5rem;
`;

export const BrandLogo = styled.div`
  font-size: 2rem;
  color: #d4af37;
`;

export const BrandText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.2;

  span {
    font-size: 1.5rem;
    color: white;
  }

  small {
    font-size: 0.8rem;
    color: #d4af37;
    font-weight: 500;
  }
`;

export const NavbarContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;
  justify-content: space-between;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const NavbarMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavbarItem = styled.div`
  position: relative;
`;

export const NavbarLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: #e0e0e0;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;

  &:hover {
    background: rgba(212, 175, 55, 0.1);
    color: #d4af37;
    transform: translateY(-2px);
  }

  svg {
    font-size: 1rem;
  }

  span {
    @media (max-width: 1024px) {
      display: none;
    }
  }
`;

export const NavbarActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const UserName = styled.div`
  font-weight: 600;
  color: white;
  font-size: 0.9rem;
`;

export const UserRole = styled.div`
  font-size: 0.8rem;
  color: #d4af37;
  text-transform: capitalize;
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(220, 53, 69, 0.3);

  &:hover {
    background: linear-gradient(135deg, #c82333, #a71e2a);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(220, 53, 69, 0.4);
  }

  svg {
    font-size: 1rem;
  }

  span {
    @media (max-width: 1024px) {
      display: none;
    }
  }
`;

export const NavbarToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(212, 175, 55, 0.1);
    color: #d4af37;
  }

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  border-top: 1px solid #333;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const MobileMenuItem = styled.div`
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }
`;
