import React from 'react';
import { Navbar as BootstrapNavbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineBell,
} from 'react-icons/hi';
import useUserStore from '../../Stores/UserStore';

import CustomButton from '../Common/CustomButton';
import './Header.css';
import TableActionDropDown from '../TableActionDropDown/TableActionDropDown';
import { RiUserSettingsLine } from 'react-icons/ri';
import { LuLogOut } from 'react-icons/lu';

const Header = ({ variant = 'default' }) => {
  const navigate = useNavigate();
  const { user, role = 'guest' } = useUserStore();
  const isAuthenticated = !!user;

  const getInitials = (name = '') => {
    return name
      ?.split(' ')
      ?.map((word) => word?.[0]?.toUpperCase())
      ?.join('');
  };
  const handleLogoutClick = () => {
    setLogoutModal(true);
  };

  const logoutAdmin = () => {
    logoutMutation.mutate(role);
  };
  const navigationItems = [
    { label: 'Home', link: '/', icon: HiOutlineHome },
    { label: 'About', link: '/about' },
    { label: 'Features', link: '/features' },
    { label: 'Contact', link: '/contact' },
  ];

  const authenticatedNavItems = [
    { label: 'Dashboard', link: '/dashboard', icon: HiOutlineHome },
    { label: 'Profile', link: '/profile', icon: HiOutlineUser },
    { label: 'Notifications', link: '/notifications', icon: HiOutlineBell },
    { label: 'Preferences', link: '/preferences', icon: HiOutlineCog },
  ];

  return (
    <BootstrapNavbar
      className={`mainHeaderBar ${variant}`}
      expand="lg"
      variant="light"
    >
      <div className="header-main-container">
        {/* Logo/Brand */}
        <BootstrapNavbar.Brand as={Link} to="/" className="navbar-brand">
          <h2 className="sidebar-title mb-0">test</h2>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Navigation Menu */}
          <Nav className="me-auto">
            {(isAuthenticated ? authenticatedNavItems : navigationItems).map(
              (item, index) => (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={item.link}
                  className="nav-link"
                >
                  {item.icon && <item.icon className="nav-icon" />}
                  {item.label}
                </Nav.Link>
              )
            )}
          </Nav>

          {/* Right Side Actions */}
          <div className="d-flex gap-2 gap-sm-3 align-items-center">
            {isAuthenticated ? (
              <>
                {/* Support Button for non-admin users */}
                {role !== 'admin' && (
                  <CustomButton
                    onClick={() => navigate('support')}
                    className="d-none d-md-block"
                  >
                    Support
                  </CustomButton>
                )}

                {/* User Dropdown */}
                <TableActionDropDown
                  actions={[
                    {
                      name: 'My Profile',
                      icon: RiUserSettingsLine,
                      onClick: () => {
                        if (user?.role === 'admin') {
                          navigate('/admin/profile');
                        } else {
                          navigate('/profile');
                        }
                      },
                    },
                    {
                      name: 'Logout',
                      icon: LuLogOut,
                      onClick: handleLogoutClick,
                    },
                  ]}
                >
                  <div className="userImage beechMein">
                    <h6>{getInitials(user?.user_name)}</h6>
                  </div>
                </TableActionDropDown>
              </>
            ) : (
              <>
                {/* Guest User Actions */}
                <CustomButton
                  as={Link}
                  to="/login"
                  variant="secondaryButton"
                  className="d-none d-sm-block"
                >
                  Login
                </CustomButton>
                <CustomButton
                  as={Link}
                  to="/signup"
                  className="d-none d-sm-block"
                >
                  Sign Up
                </CustomButton>
              </>
            )}
          </div>
        </BootstrapNavbar.Collapse>
      </div>
    </BootstrapNavbar>
  );
};

export default Header;
