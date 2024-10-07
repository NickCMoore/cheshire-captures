// Bootstrap imports
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// Component imports
import logo from '../assets/cc-logo.png';
// CSS imports
import styles from '../styles/NavBar.module.css';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { removeTokenTimestamp } from '../utils/Utils';
// React imports
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
// Axios imports
import axios from 'axios';

const NavBar = () => {
  const currentUser = useCurrentUser();
  console.log(currentUser); 
  const setCurrentUser = useSetCurrentUser();

  const [toggleNavBar, setToggleNavBar] = useState(false);

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      setToggleNavBar(!toggleNavBar);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-home"></i>Home
      </NavLink>

      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/gallery"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-images"></i>Gallery
      </NavLink>

      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profile/${currentUser?.profile_id}`}
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-user"></i>Profile
      </NavLink>

      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-home"></i>Home
      </NavLink>

      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/about"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-info-circle"></i>About
      </NavLink>

      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavLink>

      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signup"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavLink>
    </>
  );

  return (
    <Navbar 
      className={styles.NavBar} 
      expand="md" 
      fixed="top"
      expanded={toggleNavBar}
      collapseOnSelect
    >
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
              <img src={logo} alt="logo" height="55"/>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle 
          onClick={() => {
            setToggleNavBar(!toggleNavBar);
          }}
          aria-controls="basic-navbar-nav" 
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
