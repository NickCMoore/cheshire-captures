import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import styles from '../styles/NavBar.module.css';
import logo from '../assets/cc-logo.png';

// Importing icons from react-icons
import { FaHome, FaImages, FaInfoCircle, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const { currentUser, logoutUser } = useAuth(); 

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Navbar bg="light" expand="md" fixed="top" className={styles.NavBar} expanded={expanded}>
      <Container>
        <NavLink to="/" onClick={() => setExpanded(false)}>
          <Navbar.Brand>
            <img src={logo} alt="logo" height="60" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbar-collapse" onClick={() => setExpanded(expanded ? false : "expanded")} />
        <Navbar.Collapse id="navbar-collapse" className={styles.NavbarCollapse}>
          <Nav className={`${styles.Nav} ml-auto`} onSelect={() => setExpanded(false)}>
            <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}>
              <FaHome /> Home
            </NavLink>
            <NavLink exact to="/gallery" className={styles.NavLink} activeClassName={styles.Active}>
              <FaImages /> Gallery
            </NavLink>
            <NavLink exact to="/about" className={styles.NavLink} activeClassName={styles.Active}>
              <FaInfoCircle /> About
            </NavLink>
            {currentUser ? (
              <>
                <NavLink exact to={`/profile/${currentUser.username}`} className={styles.NavLink} activeClassName={styles.Active}>
                  <FaUser /> Profile
                </NavLink>
                <NavLink exact to="/" onClick={handleLogout} className={styles.NavLink}>
                  <FaSignOutAlt /> Sign Out
                </NavLink>
              </>
            ) : (
              <>
                <NavLink exact to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
                  <FaSignInAlt /> Sign In
                </NavLink>
                <NavLink exact to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
                  <FaUserPlus /> Sign Up
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
