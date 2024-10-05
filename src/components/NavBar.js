import React, { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext, SetCurrentUserContext } from '../App';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';
import logo from '../assets/cc-logo.png';

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const setCurrentUser = useContext(SetCurrentUserContext);
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await axios.post('/dj-rest-auth/logout/');
      setCurrentUser(null);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink to="/profile" className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fa-solid fa-user"></i> Profile
      </NavLink>
      <NavLink to="/" className={styles.NavLink} onClick={handleSignOut}>
        <i className="fa-solid fa-sign-out-alt"></i> Sign Out
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink exact to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fa-solid fa-sign-in-alt"></i> Sign In
      </NavLink>
      <NavLink exact to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fa-solid fa-user-plus"></i> Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="50" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse" className={styles.NavbarCollapse}>
          <Nav className={`${styles.Nav} ml-auto`}>
            <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}>
              <i className='fas fa-house'></i> Home
            </NavLink>
            <NavLink exact to="/gallery" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fa-solid fa-panorama"></i> Gallery
            </NavLink>
            <NavLink exact to="/about" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fa-solid fa-info-circle"></i> About
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
