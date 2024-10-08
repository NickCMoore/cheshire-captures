// Bootstrap imports
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
// Component imports
import logo from '../assets/cc-logo.png';
// CSS imports
import styles from '../styles/NavBar.module.css';
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import { removeTokenTimestamp } from '../utils/Utils';
// React imports
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useState } from 'react';
// Axios imports
import axios from 'axios';

const NavBar = () => {

  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // Variables to toggle open and closed mobile navbar burger menu
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
        to="/popular-photographers"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-users"></i>Popular Photographers
      </NavLink>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-user"></i>Profile
      </NavLink>
    </>
  );

  const loggedInDropdownIcons = (
    <>
      <NavDropdown.Item 
        id={styles.dropdownItem}
        as={Link} 
        to={`/profiles/${currentUser?.profile_id}`}
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-user-circle"></i>Profile
      </NavDropdown.Item>
      <NavDropdown.Item 
        id={styles.dropdownItem}
        as={Link} 
        to="/" 
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i>Sign out
      </NavDropdown.Item>
    </>
  )

  const loggedOutIcons = (
    <>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/popular-photographers"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-users"></i>Popular Photographers
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
    </>
  );

  const loggedOutDropdownIcons = (
    <>
      <NavDropdown.Item 
        id={styles.dropdownItem}
        as={Link} 
        to="/signin"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-sign-in-alt"></i>Sign in
      </NavDropdown.Item>
      <NavDropdown.Item 
        id={styles.dropdownItem}
        as={Link} 
        to="/signup"
        onClick={() => {
          setToggleNavBar(!toggleNavBar);
        }}
      >
        <i className="fas fa-user-plus"></i>Sign up
      </NavDropdown.Item>
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
            {currentUser ? loggedInIcons : loggedOutIcons}
            <NavDropdown 
              title={
                <span>
                    <i className="fas fa-user-alt ml-5"></i>
                </span>
              }
              id="basic-nav-dropdown" 
            >
              {currentUser ? loggedInDropdownIcons : loggedOutDropdownIcons}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
