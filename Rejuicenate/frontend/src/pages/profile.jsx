import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import '../styles/profilePage.css';
import NavBar from "../components/navbar";
import { Container } from 'react-bootstrap';
import PrimaryBtn from '../Buttons/primaryBtn';
import SecondaryBtn from '../Buttons/secondaryBtn';
import JuiceCard from '../components/juiceCard'; // Import JuiceCard
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {
  const { user, loading } = useUser();
  const [likedJuices, setLikedJuices] = useState([]);

  useEffect(() => {
    const fetchLikedJuices = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/likedJuices/${user._id}`);
        setLikedJuices(response.data || []); // Ensure the data is always an array
      } catch (error) {
        console.error('Error fetching liked juices:', error);
        setLikedJuices([]); // Fallback to empty array
      }
    };

    if (user?._id) fetchLikedJuices();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  const profileImageUrl = user?.profile_image 
    ? `http://localhost:5001/images/${user.profile_image}` 
    : 'http://localhost:5001/images/default.png';

  return (
    <>
      <NavBar />
      <div className="colour-bg-profile">
        <Container>
          <div>
            <img 
              src={profileImageUrl} 
              alt={`${user.name} ${user.surname}`} 
              className="profile-img" 
            />
          </div>

          <div className="profile-user-info mt-2">
            <h3>{user.name} {user.surname}</h3>
            <p>
              <strong>
                <FontAwesomeIcon icon={faEnvelope} />
              </strong> {user.email}
            </p>
          </div>

          <div className="mt-4">
            <SecondaryBtn label="Edit Profile" />
            <PrimaryBtn label="Log Out" />
          </div>

          <h1 className="mt-5">
            <FontAwesomeIcon icon={faHeart} /> Liked Juices
          </h1>

          {/* Pass likedJuices to JuiceCard */}
          <JuiceCard juices={likedJuices} />
        </Container>
      </div>
    </>
  );
}

export default ProfilePage;
