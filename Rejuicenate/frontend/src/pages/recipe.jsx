import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import NavBar from "../components/navbar";
import { Col, Container, Row } from "react-bootstrap";
import '../styles/recipe.css';
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import { useUser } from '../context/UserContext'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart as faRegHeart } from '@fortawesome/free-regular-svg-icons'; 
import { faCarrot, faBookOpen, faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 

import PrimaryBtn from "../Buttons/primaryBtn";
import SecondaryBtn from "../Buttons/secondaryBtn";
import ReviewCard from "../components/review";

function JuiceRecipe() {
  const { juiceId } = useParams(); 
  const [juice, setJuice] = useState(null); 
  const [isLiked, setIsLiked] = useState(false); 
  const { user } = useUser(); 

  // Fetch juice details and liked status
  useEffect(() => {
    const fetchJuice = async () => {
      try {
        const juiceResponse = await axios.get(`http://localhost:5001/juices/${juiceId}`);
        setJuice(juiceResponse.data);

        // Fetch liked juices for the current user
        if (user) {
          const likedResponse = await axios.get(`http://localhost:5001/likedJuices/${user._id}`);
          const likedJuices = likedResponse.data;
          // Check if the current juiceId is in the liked juices
          const likedJuiceIds = likedJuices.map(like => like._id); // Adjust based on your liked juice model
          setIsLiked(likedJuiceIds.includes(juiceId));
        }
      } catch (error) {
        console.error('Error fetching juice:', error);
      }
    };

    fetchJuice();
  }, [juiceId, user]);

  // Function to like a juice
  const handleLike = async (juiceId) => {
    try {
      const response = await axios.post('http://localhost:5001/likedJuices', {
        userId: user._id, 
        juiceId: juiceId,
      });
      console.log('Juice liked:', response.data);
      setIsLiked(true); // Set isLiked to true when liked
    } catch (error) {
      console.error('Error liking juice:', error);
    }
  };

  if (!juice) return <p>Loading...</p>;

  return (
    <div>
      <NavBar />
      <Container className="mt-2">
        <Nav.Link href="/browseJuices" className="back-button">
          <PrimaryBtn
            label={
              <>
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back
              </>
            }
          />
        </Nav.Link>
        
        <Row>
          <Col md={8}>
            <div className="align-content-center mt-5 mb-3">
              <h1>{juice.juiceName}</h1>
              <div className="button-container">
                <SecondaryBtn label={juice.category_id ? juice.category_id.category : 'No Category'} />
                <div
                  onClick={() => handleLike(juiceId)}
                  style={{ cursor: 'pointer', fontSize: '24px' }}
                >
                  <FontAwesomeIcon icon={isLiked ? faHeart : faRegHeart} className="heart-icon" style={{ color: isLiked ? 'red' : 'black' }} />
                </div>
              </div>
            </div>

            <Row>
              <Col md="1">
                <div className="h-line"></div>
              </Col>
              <Col md="11" className="category-text">
                <h4>Dietary Modification:</h4>
                <p>{juice.category_id ? juice.category_id.dietaryMods : 'No dietary modification information available.'}</p>
              </Col>
            </Row>

            <h3 className="mt-4 mb-2">How to Make it:</h3>
            <h4>
              <FontAwesomeIcon icon={faCarrot} style={{ marginRight: '8px' }} />
              Ingredients:
            </h4>
            <ul>
              {JSON.parse(juice.ingredients).map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            
            <h4 className="mt-3">
              <FontAwesomeIcon icon={faBookOpen} style={{ marginRight: '8px' }} />
              Instructions
            </h4>
            <ol>
              {JSON.parse(juice.instructions).map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </Col>
          <Col md={4}>
            <img src={`http://localhost:5001/${juice.image}`} alt={juice.juiceName} className="juice-image" />
          </Col>
        </Row>


        {/* Reviews */}
        <h2 className="mt-3">User Reviews</h2>
        <ReviewCard className="mb-3" commentText="This juice is amazing! I love the flavors. This juice is amazing! I love the flavors. This juice is amazing! I love the flavors." />
        <ReviewCard commentText="This juice is amazing! I love the flavors. This juice is amazing! I love the flavors. This juice is amazing! I love the flavors." />
      </Container>
    </div>
  );
}

export default JuiceRecipe;
