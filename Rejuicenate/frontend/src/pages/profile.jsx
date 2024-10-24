import React from 'react';
import { useUser } from '../context/UserContext';
import '../styles/profilePage.css';
import NavBar from "../components/navbar";
import { Col, Row } from 'react-bootstrap';
import PrimaryBtn from '../Buttons/primaryBtn';

function ProfilePage() {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  const profileImageUrl = user?.profile_image 
    ? `http://localhost:5001/images/${user.profile_image}` 
    : 'http://localhost:5001/images/default.png'; // Use default image if none exists

  return (
    <>
    <NavBar />
    <div className="container mt-5">
      {user ? (
        <Row>
            <Col lg="6">
            <h1>Your Profile</h1>
                <div className="background-profile d-flex align-items-center">
                    <img 
                    src={profileImageUrl} 
                    alt={`${user.name} ${user.surname}`} 
                    className="profile-img" 
                    />
                    <div className="user-info">
                        <h3>Your Info</h3>
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Surname:</strong> {user.surname}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <PrimaryBtn label="Log Out"></PrimaryBtn>
                    </div>
                </div>
            </Col>
            
            <Col lg="6">
            <h1>Liked Juices</h1></Col>
        </Row>
        
      ) : (
        <p>No user data available.</p>
      )}
    </div>
    </>
  );
}

export default ProfilePage;
