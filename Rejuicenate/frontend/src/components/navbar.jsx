import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/Logo-Rejuicenate.svg';
import { useUser } from '../context/UserContext'; // Import the user context
import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom

import DefaultImage from "../assets/default.jpg"
import '../styles/navbar.css';

function BasicExample() {
  const { user } = useUser(); // Access the user details from context

  const profileImageUrl = user?.profile_image 
    ? `http://localhost:5001/profileImages/${encodeURIComponent(user.profile_image)}` 
    : 'http://localhost:5001/images/default.png'; // Use default image if none exists

  const defaultImageUrl = 'http://localhost:5001/images/default.png';

  return (
    <Navbar expand="lg" className="nav">
      <Container>
        <Navbar.Brand href="/">
          <div className="flex content-center">
            <img className="logo" src={Logo} alt="Rejuicenate-Logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Conditionally render links based on user type */}
            {user?.user_type === 'admin' ? (
              <NavLink 
                to="/browseJuices" 
                className={({ isActive }) => (isActive ? 'active-link' : 'nav-link') + ' font-body mx-3'}
              >
                Browse Juices
              </NavLink>
            ) : (
              <>
                <NavLink 
                  to="/" 
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav-link') + ' font-body mx-3'}
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/browseJuices" 
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav-link') + ' font-body mx-3'}
                >
                  Browse Juices
                </NavLink>
                <NavLink 
                  to="/trackProgress" 
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav-link') + ' font-body mx-3'}
                >
                  Track Progress
                </NavLink>
              </>
            )}
          </Nav>
          <Nav>
            <Nav.Link href="/profile">
              <div className="user-info d-flex align-items-center">
                {user ? (
                  <>
                    <img 
                      src={profileImageUrl} 
                      alt={`${user.name} ${user.surname}`} 
                      className="profile-img-nav" 
                    />
                    <p className="user-greeting ms-2 mb-0">
                      {user.name} {user.surname}
                    </p>
                  </>
                ) : (
                  <>
                    <img 
                      src={DefaultImage} 
                      alt="guest-image" 
                      className="profile-img-nav" 
                    />
                    <p className="user-greeting ms-3 mb-0">Sign In</p>
                  </>
                )}
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
