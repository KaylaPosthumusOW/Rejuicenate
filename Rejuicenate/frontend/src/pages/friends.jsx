import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import '../styles/friends.css'; // Optional: Add your own styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Friends() {
  const [users, setUsers] = useState([]);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/users");
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
    <Container className="mt-5">
        <div className="mt-5 d-flex justify-content-between align-items-center">
            <div>
                <h1>Make Some Friends!</h1>
                <p>Make some friends to join you on your journey to your better self</p>
            </div>
            <div>
            <Form inline>
                <Row>
                <Col xs="auto">
                    <Form.Control
                    type="text"
                    placeholder="Search"
                    className="search mr-sm-1"
                    />
                </Col>
                <Col xs="auto">
                    <Button type="submit" className="search-btn">
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </Col>
                </Row>
            </Form>
            </div>
        </div>
      <Row>
        {users.length > 0 ? (
          users.map((user) => {
            const profileImageUrl = user?.profile_image 
              ? `http://localhost:5001/profileImages/${user.profile_image}` 
              : 'http://localhost:5001/images/default.jpg'; // Use default image if none exists

            return (
              <Col key={user._id} xs={12} md={3} className="mb-4">
                <div className="user-card">
                    <div className="top-bg">
                        <img 
                        src={profileImageUrl} 
                        alt={`${user.name} ${user.surname}`} 
                        className="user-image" 
                        />
                    </div>
                  <div className="name">
                    <h5>{user.name} {user.surname}</h5>
                  </div>
                  <Row className="text-center followers-section mt-4 mx-4">
                    <Col md="6" className="d-flex flex-column align-items-center">
                        <p className="stat-number">00</p>
                        <p className="stat-label">Followers</p>
                    </Col>
                    <Col md="6" className="d-flex flex-column align-items-center">
                        <p className="stat-number">00</p>
                        <p className="stat-label">Following</p>
                    </Col>
                </Row>
                </div>
              </Col>
            );
          })
        ) : (
          <p>No users found.</p>
        )}
      </Row>
    </Container>
    </>
  );
}

export default Friends;
