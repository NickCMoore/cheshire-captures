import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';
import logo from '../assets/Screenshot 2024-09-23 095558.png'

const NavBar = () => {
  return (
    <Navbar bg="-grey" expand="md" fixed="top" className={styles.NavBar}>
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="50" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="navbar-collapse" />
        <Navbar.Collapse id="navbar-collapse">
          <Nav className={`${styles.Nav} ml-auto`}>
            <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}>
              <i className='fas fa-house'></i> Home
            </NavLink>
            <NavLink exact to="/gallery" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fa-solid fa-panorama"></i> Gallery
            </NavLink>
            <NavLink exact to="/signin" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fa-solid fa-user-plus"></i> Sign In
            </NavLink>
            <NavLink exact to="/signup" className={styles.NavLink} activeClassName={styles.Active}>
              <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign Up
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
