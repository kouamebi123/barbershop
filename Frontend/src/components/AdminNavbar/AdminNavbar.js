import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import {
  AdminNavbarContainer,
  NavbarBrand,
  BrandLogo,
  BrandText,
  NavbarContent,
  NavbarMenu,
  NavbarItem,
  NavbarLink,
  NavbarTitle,
  NavbarActions,
  UserInfo,
  UserName,
  UserRole,
  LogoutButton,
  NavbarToggle,
  MobileMenu,
  MobileMenuItem
} from './AdminNavbar.styles';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <AdminNavbarContainer>
      <NavbarBrand>
        <BrandLogo>✂️</BrandLogo>
        <BrandText>
          <span>Barbershop</span>
          <small>Administration</small>
        </BrandText>
      </NavbarBrand>

      <NavbarContent>
        <NavbarMenu>
        </NavbarMenu>

        <NavbarTitle>Tableau de Bord</NavbarTitle>

        <NavbarActions>
          <UserInfo>
            <UserName>{user?.username || 'Admin'}</UserName>
            <UserRole>{user?.role || 'Administrateur'}</UserRole>
          </UserInfo>
          
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Déconnexion</span>
          </LogoutButton>
        </NavbarActions>

        <NavbarToggle onClick={toggleMobileMenu}>
          ☰
        </NavbarToggle>
      </NavbarContent>

      {isMobileMenuOpen && (
        <MobileMenu>
          <MobileMenuItem>
            <LogoutButton onClick={handleLogout}>
              <FaSignOutAlt />
              <span>Déconnexion</span>
            </LogoutButton>
          </MobileMenuItem>
        </MobileMenu>
      )}
    </AdminNavbarContainer>
  );
};

export default AdminNavbar;
