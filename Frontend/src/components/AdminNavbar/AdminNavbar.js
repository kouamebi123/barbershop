import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaCog, FaHome, FaCalendarAlt, FaUsers, FaCut, FaMapMarkerAlt } from 'react-icons/fa';
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
          <NavbarItem>
            <NavbarLink as={Link} to="/admin/dashboard">
              <FaHome />
              <span>Dashboard</span>
            </NavbarLink>
          </NavbarItem>
          
          <NavbarItem>
            <NavbarLink as={Link} to="/admin/bookings">
              <FaCalendarAlt />
              <span>Réservations</span>
            </NavbarLink>
          </NavbarItem>
          
          <NavbarItem>
            <NavbarLink as={Link} to="/admin/customers">
              <FaUsers />
              <span>Clients</span>
            </NavbarLink>
          </NavbarItem>
          
          <NavbarItem>
            <NavbarLink as={Link} to="/admin/services">
              <FaCut />
              <span>Services</span>
            </NavbarLink>
          </NavbarItem>
          
          <NavbarItem>
            <NavbarLink as={Link} to="/admin/locations">
              <FaMapMarkerAlt />
              <span>Salons</span>
            </NavbarLink>
          </NavbarItem>
        </NavbarMenu>

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
            <NavbarLink as={Link} to="/admin/dashboard" onClick={toggleMobileMenu}>
              <FaHome />
              <span>Dashboard</span>
            </NavbarLink>
          </MobileMenuItem>
          
          <MobileMenuItem>
            <NavbarLink as={Link} to="/admin/bookings" onClick={toggleMobileMenu}>
              <FaCalendarAlt />
              <span>Réservations</span>
            </NavbarLink>
          </MobileMenuItem>
          
          <MobileMenuItem>
            <NavbarLink as={Link} to="/admin/customers" onClick={toggleMobileMenu}>
              <FaUsers />
              <span>Clients</span>
            </NavbarLink>
          </MobileMenuItem>
          
          <MobileMenuItem>
            <NavbarLink as={Link} to="/admin/services" onClick={toggleMobileMenu}>
              <FaCut />
              <span>Services</span>
            </NavbarLink>
          </MobileMenuItem>
          
          <MobileMenuItem>
            <NavbarLink as={Link} to="/admin/locations" onClick={toggleMobileMenu}>
              <FaMapMarkerAlt />
              <span>Salons</span>
            </NavbarLink>
          </MobileMenuItem>
          
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
