import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';
import logo from '../assets/cc-logo.png';
import { FaHome, FaImages, FaUserPlus, FaSignInAlt, FaInfoCircle } from 'react-icons/fa'; // FontAwesome icons

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar bg="-grey" expand="md" fixed="top" className={styles.NavBar} expanded={expanded}>
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
            <NavLink exact to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
              <FaSignInAlt /> Sign In
            </NavLink>
            <NavLink exact to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
              <FaUserPlus /> Sign Up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
