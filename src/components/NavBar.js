import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; 
import styles from '../styles/NavBar.module.css';
import logo from '../assets/cc-logo.png';

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const { currentUser, logoutUser, loading } = useAuth(); 

  const handleLogout = async () => {
    try {
      await logoutUser();
      setExpanded(false); 
    } catch (err) {
      console.error(err);
    }
  };


  if (loading) {
    return null; 
  }

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
              <i className='fas fa-house'></i> Home
            </NavLink>
            <NavLink exact to="/gallery" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fa-solid fa-panorama"></i> Gallery
            </NavLink>
            <NavLink exact to="/about" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fa-solid fa-info-circle"></i> About
            </NavLink>

            {currentUser ? (
              <>
                <NavLink exact to={`/profile/${currentUser.username}`} className={styles.NavLink} activeClassName={styles.Active}>
                  <i className="fa-solid fa-user"></i> Profile
                </NavLink>
                <NavLink exact to="/" onClick={handleLogout} className={styles.NavLink}>
                  <i className="fa-solid fa-sign-out-alt"></i> Sign Out
                </NavLink>
              </>
            ) : (
              <>
                <NavLink exact to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
                  <i className="fa-solid fa-sign-in-alt"></i> Sign In
                </NavLink>
                <NavLink exact to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
                  <i className="fa-solid fa-user-plus"></i> Sign Up
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
