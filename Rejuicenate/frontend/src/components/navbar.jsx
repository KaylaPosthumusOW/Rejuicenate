import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/Logo-Rejuicenate.svg';
import { useUser } from '../context/UserContext';
import { NavLink } from 'react-router-dom';

import DefaultImage from "../assets/default.jpg";
import '../styles/navbar.css';

function BasicExample() {
  const { user } = useUser();
  const [expanded, setExpanded] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const profileImageUrl = user?.profile_image 
    ? `${apiUrl}/profileImages/${encodeURIComponent(user.profile_image)}` 
    : DefaultImage;

  return (
    <Navbar expand="lg" className="nav" expanded={expanded}>
      <Container>
        <Navbar.Brand href="/">
          <div className="flex content-center">
            <img className="logo" src={Logo} alt="Rejuicenate-Logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user?.user_type === 'admin' ? (
              <>
                <NavLink 
                  onClick={() => setExpanded(false)}
                  to="/browseJuices" 
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav-link') + ' font-body mx-3'}
                >
                  Browse Juices
                </NavLink>
                <NavLink 
                  onClick={() => setExpanded(false)}
                  to="/admin/addJuice" 
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav-link') + ' font-body mx-3'}
                >
                  Add Juice
                </NavLink>
                <NavLink 
                  onClick={() => setExpanded(false)}
                  to="/admin/editJuices" 
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav-link') + ' font-body mx-3'}
                >
                  Edit Juices
                </NavLink>
                <NavLink 
                  onClick={() => setExpanded(false)}
                  to="/admin/reviews" 
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav-link') + ' font-body mx-3'}
                >
                  Flagged Reviews
                </NavLink>
              </>
            ) : (
              <>
                <NavLink 
                  onClick={() => setExpanded(false)}
                  to="/" 
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav-link') + ' font-body mx-3'}
                >
                  Home
                </NavLink>
                <NavLink 
                  onClick={() => setExpanded(false)}
                  to="/browseJuices" 
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav-link') + ' font-body mx-3'}
                >
                  Browse Juices
                </NavLink>
                <NavLink 
                  onClick={() => setExpanded(false)}
                  to="/trackProgress" 
                  className={({ isActive }) => (isActive ? 'active-link' : 'nav-link') + ' font-body mx-3'}
                >
                  Track Progress
                </NavLink>
              </>
            )}
          </Nav>
          <Nav>
            <Nav.Link onClick={() => setExpanded(false)} href="/profile">
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
                    <p className="user-greeting ms-3 mb-0">Log In</p>
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
