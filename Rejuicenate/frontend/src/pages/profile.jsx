import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import '../styles/profilePage.css';
import { Container, Modal, NavLink } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PrimaryBtn from '../Buttons/primaryBtn';
import SecondaryBtn from '../Buttons/secondaryBtn';
import JuiceCard from '../components/juiceCard';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import Footer from '../components/footer';

function ProfilePage() {
  const { user, loading, setUser } = useUser();
  const [likedJuices, setLikedJuices] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [profileImagePreview, setProfileImagePreview] = useState(profileImageUrl);

  const apiUrl = process.env.REACT_APP_API_URL;
  
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (!user && !loading) {
      navigate('/login');
      return;
    }
  
    const fetchLikedJuices = async () => {
      if (user) {
        try {
          const response = await axios.get(`${apiUrl}/likedJuices/${user._id}`);
          setLikedJuices(response.data || []);
        } catch (error) {
          console.error('Error fetching liked juices:', error);
          setLikedJuices([]);
        }
      }
    };

    fetchLikedJuices();

    if (user) {
      setValue('name', user.name);
      setValue('surname', user.surname);
      setValue('email', user.email);

      const updatedProfileImageUrl = user.profile_image
        ? `${apiUrl}/profileImages/${encodeURIComponent(user.profile_image)}`
        : `${apiUrl}/images/default.png`;

      setProfileImageUrl(updatedProfileImageUrl);
      setProfileImagePreview(updatedProfileImageUrl);
    }
  }, [user, loading, navigate, setValue]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleEditProfile = () => {
    setShowEditForm(true);
  };

  const handleProfileUpdate = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('surname', data.surname);
    formData.append('email', data.email);
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }

    try {
      const response = await axios.put(`${apiUrl}/users/updateProfile/${user._id}`, formData);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      const updatedProfileImageUrl = response.data.profile_image
        ? `${apiUrl}/profileImages/${encodeURIComponent(response.data.profile_image)}`
        : `${apiUrl}/images/default.jpg`;

      setProfileImageUrl(updatedProfileImageUrl);
      setShowEditForm(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const previewUrl = URL.createObjectURL(file);
      setProfileImagePreview(previewUrl);
    }
  };

  const removeLikedJuice = async (juiceId) => {
    try {
      await axios.delete(`${apiUrl}/likedJuices/${user._id}/${juiceId}`);
      setLikedJuices((prevLikedJuices) => prevLikedJuices.filter(juice => juice._id !== juiceId));
    } catch (error) {
      console.error('Error removing liked juice:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

  return (
    <>
      <div className="colour-bg-profile">
        <Container>
          <div className="center-img">
            <img src={profileImageUrl} alt={`${user.name} ${user.surname}`} className="profile-img" />
          </div>

          <div className="profile-user-info mt-2">
            <h3>{user.name} {user.surname}</h3>
            <p><strong><FontAwesomeIcon icon={faEnvelope} /></strong> {user.email}</p>
          </div>

          <div className="profile-btns mt-4">
            <SecondaryBtn label="Edit Profile" onClick={handleEditProfile} />
            <PrimaryBtn label="Log Out" onClick={handleLogout} />
          </div>

          <Modal show={showEditForm} onHide={() => setShowEditForm(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="text-center">
                <img src={profileImagePreview} alt="Profile Preview" className="profile-image-preview" />
              </div>
              <form onSubmit={handleSubmit(handleProfileUpdate)}>
                <div className="file-input-container">
                  <label htmlFor="file-upload" className="custom-file-upload">
                    Update Profile Image
                  </label>
                  <input id="file-upload" className="transparent" type="file" onChange={handleImageChange} />
                </div>
                <div>
                  <label>Name:</label>
                  <input className="input-text" type="text" {...register('name', { required: true })} />
                </div>
                <div>
                  <label>Surname:</label>
                  <input className="input-text" type="text" {...register('surname', { required: true })} />
                </div>
                <div>
                  <label>Email:</label>
                  <input className="input-text" type="email" {...register('email', { required: true })} />
                </div>
                <div className="mt-3 d-flex">
                  <PrimaryBtn className="align-content-end" label="Update Profile" type="submit" />
                </div>
              </form>
            </Modal.Body>
          </Modal>
          {user?.user_type === 'admin' && <div style={{ marginBottom: "125px" }}></div>}

          {/* Display liked juices for standard users only */}
          {user.user_type === 'standard' && (
            <>
              <h1 className="mt-5">
                <FontAwesomeIcon icon={faHeart} /> Liked Juices
              </h1>
              <JuiceCard juices={likedJuices} onRemoveJuice={removeLikedJuice} />
            </>
          )}
        </Container>

        <Footer />
      </div>
    </>
  );
}

export default ProfilePage;
