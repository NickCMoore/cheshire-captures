import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className={styles.NavBar}>
      <Navbar.Brand as={Link} to="/">
        Cheshire Captures
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          {/* Add your NavDropdown here */}
          <NavDropdown title="Categories" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/category/nature">
              Nature
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/landscape">
              Landscape
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/category/cityscape">
              Cityscape
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/category/other">
              Other
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/contact">
            Contact
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;

