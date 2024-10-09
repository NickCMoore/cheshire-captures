import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { removeTokenTimestamp } from '../utils/Utils';
import axios from 'axios';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/cc-logo.png';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const [toggleNavBar, setToggleNavBar] = useState(false);

  const handleSignOut = async () => {
    try {
      await axios.post('dj-rest-auth/logout/');
      setCurrentUser(null);
      setToggleNavBar(false);
      removeTokenTimestamp();
      history.push('/');
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
        to="/gallery"
        onClick={() => setToggleNavBar(false)}
      >
        <i className="fas fa-images"></i>Gallery
      </NavLink>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/popular-photographers"
        onClick={() => setToggleNavBar(false)}
      >
        <i className="fas fa-users"></i>Popular Photographers
      </NavLink>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profile/${currentUser?.photographer_id}`}
        onClick={() => setToggleNavBar(false)}
      >
        <i className="fas fa-user"></i>Profile
      </NavLink>
      <NavLink
        exact
        className={styles.NavLink}
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
        to="/about"
        onClick={() => setToggleNavBar(false)}
      >
        <i className="fas fa-info-circle"></i>About
      </NavLink>
      <NavDropdown 
        title={<span><i className="fas fa-user-alt ml-5"></i></span>}
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item 
          id={styles.dropdownItem}
          as={Link} 
          to="/signin"
          onClick={() => setToggleNavBar(false)}
        >
          <i className="fas fa-sign-in-alt"></i>Sign in
        </NavDropdown.Item>
        <NavDropdown.Item 
          id={styles.dropdownItem}
          as={Link} 
          to="/signup"
          onClick={() => setToggleNavBar(false)}
        >
          <i className="fas fa-user-plus"></i>Sign up
        </NavDropdown.Item>
      </NavDropdown>
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
          onClick={() => setToggleNavBar(!toggleNavBar)}
          aria-controls="basic-navbar-nav" 
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-right">
            <NavLink
              exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/"
              onClick={() => setToggleNavBar(false)}
            >
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
