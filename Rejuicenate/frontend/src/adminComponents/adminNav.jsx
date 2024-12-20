import { NavLink } from 'react-router-dom'; // Import NavLink from react-router-dom
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import "../adminStyles/adminNav.css"; // Import styles

function AdminNav() {
  return (
    <Navbar expand="lg" className="adminNav">
      <Nav className="navLinks mx-auto">
        <NavLink 
          to="/admin/addJuice" 
          className={({ isActive }) => isActive ? 'active-link' : 'nav-link'}
        >
          <p>Add Juice</p>
        </NavLink>

        <NavLink 
          to="/admin/editJuices" 
          className={({ isActive }) => isActive ? 'active-link' : 'nav-link'}
        >
          <p>Edit Juices</p>
        </NavLink>

        <NavLink 
          to="/admin/reviews" 
          className={({ isActive }) => isActive ? 'active-link' : 'nav-link'}
        >
          <p>Flagged Reviews</p>
        </NavLink>
      </Nav>
    </Navbar>
  );
}

export default AdminNav;
