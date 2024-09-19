import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className={styles.NavBar}>
      <Navbar.Brand href="/">Cheshire Captures</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/gallery">Gallery</Nav.Link>
          <NavDropdown title="More" id="basic-nav-dropdown">
            <NavDropdown.Item href="/about">About</NavDropdown.Item>
            <NavDropdown.Item href="/contact">Contact</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;


