import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/NavBar.module.css';
import logo from '../assets/cc-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faImage, faUser, faSignOutAlt, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const { currentUser, logoutUser } = useAuth();

  return (
    <Navbar bg="light" expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/" className={styles.NavLink}>
          <Navbar.Brand>
            <img src={logo} alt="logo" height="60" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className="ml-auto">
            <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}>
              <FontAwesomeIcon icon={faHome} /> Home
            </NavLink>
            <NavLink exact to="/gallery" className={styles.NavLink} activeClassName={styles.Active}>
              <FontAwesomeIcon icon={faImage} /> Gallery
            </NavLink>
            <NavLink exact to="/about" className={styles.NavLink} activeClassName={styles.Active}>
              About
            </NavLink>

            {currentUser ? (
              <>
                <NavLink to="/profile" className={styles.NavLink} activeClassName={styles.Active}>
                  <FontAwesomeIcon icon={faUser} /> Profile
                </NavLink>
                <NavLink to="/" className={styles.NavLink} onClick={logoutUser}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
                </NavLink>
              </>
            ) : (
              <>
                <NavLink exact to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
                  <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                </NavLink>
                <NavLink exact to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
                  <FontAwesomeIcon icon={faUserPlus} /> Sign Up
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
