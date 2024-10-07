import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/cc-logo.png";
import styles from "../styles/NavBar.module.css";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import axios from "axios";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/", { withCredentials: true });
      setCurrentUser(null);
      history.push("/signin");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const loggedInIcons = (
    <>
      <span className={styles.Username}>{currentUser?.username}</span>
      <NavLink to="/profile" className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fas fa-user"></i> Profile
      </NavLink>
      <NavLink
        to="/"
        className={styles.NavLink}
        activeClassName={styles.Active}
        onClick={handleSignOut}
      >
        <i className="fas fa-sign-out-alt"></i> Sign Out
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fas fa-sign-in-alt"></i> Sign In
      </NavLink>
      <NavLink to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
        <i className="fas fa-user-plus"></i> Sign Up
      </NavLink>
    </>
  );

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/">
              <i className="fas fa-home"></i> Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
