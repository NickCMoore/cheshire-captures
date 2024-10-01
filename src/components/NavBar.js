import { Navbar, Nav, Container } from 'react-bootstrap';
import styles from '../styles/NavBar.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../assets/Screenshot 2024-09-23 095558.png'

const NavBar = () => {
  return (
    <Navbar bg="-grey" expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
            <Navbar.Brand>
                <img src={logo} alt="logo" height="50"/>
            </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className={`${styles.Nav} ml-auto`}>
            <Nav.Link>
              <i className='fas fa-house'></i>Home</Nav.Link>
            <Nav.Link>
              <i class="fa-solid fa-panorama"></i>Gallery</Nav.Link>
            <Nav.Link>
              <i class="fa-solid fa-user-plus"></i>Sign in</Nav.Link>
            <Nav.Link>
              <i class="fa-solid fa-arrow-right-to-bracket"></i>Sign up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
