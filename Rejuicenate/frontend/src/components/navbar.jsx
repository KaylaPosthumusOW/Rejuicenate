import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../assets/Logo-Rejuicenate.svg';
import { useUser } from '../context/UserContext'; // Import the user context

import '../styles/navbar.css';

function BasicExample() {
  const { user } = useUser(); // Access the user details from context

  const profileImageUrl = user?.profile_image 
    ? `http://localhost:5001/profileImages/${encodeURIComponent(user.profile_image)}` 
    : 'http://localhost:5001/images/default.png'; // Use default image if none exists

  return (
    <Navbar expand="lg" className="nav">
      <Container>
        <Navbar.Brand href="/">
          <div className="flex content-center">
            <img className="logo" src={Logo} alt="Logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" className="font-body mx-3">Home</Nav.Link>
            <Nav.Link href="/browseJuices" className="font-body mx-3">Browse Juices</Nav.Link>
            <Nav.Link href="/trackProgress" className="font-body mx-3">Track Progress</Nav.Link>
            <Nav.Link href="/friends" className="font-body mx-3">Make Friends</Nav.Link>
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
                  <p className="user-greeting mb-0">Guest</p>
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
