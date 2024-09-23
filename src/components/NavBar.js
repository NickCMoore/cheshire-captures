import { Navbar, Nav } from 'react-bootstrap';
import styles from './NavBar.module.css';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className={styles.NavBar}>
      <Navbar.Brand href="/">Cheshire Captures</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-collapse" />
      <Navbar.Collapse id="navbar-collapse">
        <Nav className={`${styles.Nav} ml-auto`}>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/gallery">Gallery</Nav.Link>
          <Nav.Link href="/signin">Sign in</Nav.Link>
          <Nav.Link href="/signup">Sign up</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
