import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import '../styles/profilePage.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from '../Buttons/primaryBtn';
import SecondaryBtn from '../Buttons/secondaryBtn';
import JuiceCard from '../components/juiceCard';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';

function ProfilePage() {
  const { user, loading, setUser } = useUser();
  const [likedJuices, setLikedJuices] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  // Initialize profileImageUrl to an empty string initially
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
      return;
    }

    const fetchLikedJuices = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/likedJuices/${user._id}`);
        setLikedJuices(response.data || []);
      } catch (error) {
        console.error('Error fetching liked juices:', error);
        setLikedJuices([]);
      }
    };

    if (user) {
      fetchLikedJuices();
      // Initialize state with user info
      setName(user.name);
      setSurname(user.surname);
      setEmail(user.email);

      // Set profileImageUrl based on user.profile_image
      if (user.profile_image) {
        const updatedProfileImageUrl = `http://localhost:5001/profileImages/${encodeURIComponent(user.profile_image)}`;
        setProfileImageUrl(updatedProfileImageUrl);
      } else {
        setProfileImageUrl('http://localhost:5001/images/default.png'); // Set to default image if none exists
      }

      console.log("Profile Image URL:", profileImageUrl); // Log URL
    }
  }, [user, loading, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleEditProfile = () => {
    setShowEditForm(true);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('email', email);
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }

    try {
      const response = await axios.put(`http://localhost:5001/users/updateProfile/${user._id}`, formData);
      setUser(response.data); // Update user context with the new data

      // Save updated user data to localStorage
      localStorage.setItem('user', JSON.stringify(response.data));

      // Update the profileImageUrl state
      const updatedProfileImageUrl = response.data.profile_image
        ? `http://localhost:5001/profileImages/${encodeURIComponent(response.data.profile_image)}`
        : 'http://localhost:5001/images/default.png';

      setProfileImageUrl(updatedProfileImageUrl); // Set the new profile image URL

      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <div className="colour-bg-profile">
      <Container>
        <div>
          <img 
            src={profileImageUrl} // Renders the image based on profileImageUrl
            alt={`${user.name} ${user.surname}`} 
            className="profile-img" 
          />
          <p>Do you want to personalise your profile?</p>
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
          <SecondaryBtn label="Edit Profile" onClick={handleEditProfile} />
          <PrimaryBtn label="Log Out" onClick={handleLogout} />
        </div>

        {showEditForm && (
          <form className="edit-profile-form mt-4" onSubmit={handleProfileUpdate}>
            <div>
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label>Surname:</label>
              <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
            </div>
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>Profile Image:</label>
              <input type="file" onChange={(e) => setProfileImage(e.target.files[0])} />
            </div>
            <PrimaryBtn label="Update Profile" type="submit" />
            <SecondaryBtn label="Cancel" onClick={() => setShowEditForm(false)} />
          </form>
        )}

        <h1 className="mt-5">
          <FontAwesomeIcon icon={faHeart} /> Liked Juices
        </h1>

        <JuiceCard juices={likedJuices} />
      </Container>
    </div>
  );
}

export default ProfilePage;
