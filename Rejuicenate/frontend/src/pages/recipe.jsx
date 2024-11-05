import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Button, Col, Container, Row } from "react-bootstrap";
import '../styles/recipe.css';
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import { useUser } from '../context/UserContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart as faRegHeart } from '@fortawesome/free-regular-svg-icons'; 
import { faCarrot, faBookOpen, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReviewCard from "../components/review";
import AddReview from "../components/addReview";
import Footer from "../components/footer";
import LoadingScreen from "../components/loadingscreen";

function JuiceRecipe() {
   const { juiceId } = useParams(); 
   const [juice, setJuice] = useState(null); 
   const [reviews, setReviews] = useState([]); 
   const [isLiked, setIsLiked] = useState(false); 
   const [likedJuiceId, setLikedJuiceId] = useState(null);

   const apiUrl = process.env.REACT_APP_API_URL;

   const { user } = useUser(); 

   useEffect(() => {
    const fetchJuice = async () => {
        try {
            const juiceResponse = await axios.get(`${apiUrl}/juices/${juiceId}`);
            setJuice(juiceResponse.data);

            const reviewsResponse = await axios.get(`${apiUrl}/reviews/${juiceId}`);
            setReviews(reviewsResponse.data); 

            if (user) {
                const likedResponse = await axios.get(`${apiUrl}/likedJuices/${user._id}`);
                const likedJuices = likedResponse.data;
                const likedJuiceIds = likedJuices.map(like => like._id); // Assuming likedJuices contains juiceId
                setIsLiked(likedJuiceIds.includes(juiceId));

                // Set the likedJuiceId for deletion
                const likedJuice = likedJuices.find(like => like._id === juiceId);
                if (likedJuice) {
                    setLikedJuiceId(likedJuice._id); // Use the liked juice ID here
                } else {
                    setLikedJuiceId(null); // Reset if not found
                }
            }
        } catch (error) {
            console.error('Error fetching juice or reviews:', error);
        }
    };

    fetchJuice();
}, [juiceId, user]);


   const addReview = (newReview) => {
      const updatedReview = {
         ...newReview,
         userId: {
            name: user.name,
            surname: user.surname,
            profile_image: user.profile_image,
         },
         isFlagged: false, // Default flag state
      };
      setReviews((prevReviews) => [...prevReviews, updatedReview]); 
   };

   // Function to fetch updated reviews
   const fetchReviews = async () => {
      try {
         const reviewsResponse = await axios.get(`${apiUrl}/reviews/${juiceId}`);
         setReviews(reviewsResponse.data);
      } catch (error) {
         console.error('Error fetching updated reviews:', error);
      }
   };

   // Function to handle flagging a review
   const handleFlag = async (reviewId, index) => {
      try {
         // Update the review in the database to toggle the flag
         await axios.put(`${apiUrl}/reviews/${reviewId}/flag`);

         // Refetch the reviews to get the updated state
         fetchReviews();
      } catch (error) {
         console.error('Error flagging review:', error);
      }
   };

   const handleLike = async (juiceId) => {
      try {
         const response = await axios.post(`${apiUrl}/likedJuices/add`, {
            userId: user._id, 
            juiceId: juiceId,
         });
         console.log('Juice liked:', response.data);
         setIsLiked(true); 
      } catch (error) {
         console.error('Error liking juice:', error);
      }
   };
    

   const handleDeleteLike = async () => {
      try {
        // Send the juiceId to the new delete route
        const response = await axios.delete(`${apiUrl}/likedJuices/deleteLikedJuiceByJuiceId/${juiceId}`);
        console.log(response.data);
        
        // Update the state to reflect the change
        setIsLiked(false);
        setLikedJuiceId(null); // Reset the likedJuiceId
      } catch (error) {
        console.error('Error deleting liked juice:', error);
      }
    };
    
  

   if (!juice) return <LoadingScreen />;

   return (
      <div>
         <Container className="mt-2">
            <Nav.Link href="/browseJuices" className="back-button">
               <Button className="backBtn">                        
                  <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Back
               </Button>
            </Nav.Link>
            
            <Row className="g-5">
               <Col md={8} className="recipe-content">
               <div className="align-content-center mt-5 mb-3 d-flex justify-content-between align-items-start">
               <div>
                  <h1>{juice.juiceName}</h1>
                  <p>Crafted to support your journey toward better health, this juice is designed to help with <span className="categoryName">{juice.category_id ? juice.category_id.category : 'No Category'}</span>, providing natural nourishment and a boost where you need it most.</p>
               </div>
               
               <div className="mb-5 d-flex align-items-center">
                  {/* Conditional rendering for the like button */}
                  <div
                     onClick={() => isLiked ? handleDeleteLike() : handleLike(juiceId)} // Toggle between liking and deleting the like
                     style={{ cursor: 'pointer', fontSize: '24px' }}
                  >
                     <FontAwesomeIcon 
                     icon={isLiked ? faHeart : faRegHeart} 
                     className="heart-icon" 
                     style={{ color: isLiked ? 'red' : 'black' }} 
                     />
                  </div>
               </div>
               </div>

                  <Row>
                     <Col md="1">
                        <div className="h-line"></div>
                     </Col>
                     <Col md="11" className="category-text">
                        <h4 className="green-text">Dietary Modification:</h4>
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
                  <img src={`${apiUrl}/${juice.image}`} alt={juice.juiceName} className="juice-image" />
               </Col>
            </Row>

            {/* Add Review Form */}
            <AddReview juiceId={juiceId} userId={user._id} onAddReview={addReview} />

            <h2 className="mt-5">What Others Are Saying</h2>
            <Row className="mt-3">
               {reviews.map((review, index) => (
                  <Col md={4} key={review._id}>
                     <ReviewCard
                        commentText={review.commentText} 
                        personalTip={review.personalTip}
                        userProfileImage={review.userId.profile_image} 
                        userName={`${review.userId.name} ${review.userId.surname}`} 
                        rating={review.rating} 
                        isFlagged={review.isFlagged} // Pass the flag state
                        onFlag={() => handleFlag(review._id, index)} // Pass the flag handler with reviewId
                     />
                  </Col>
               ))}
            </Row>
         </Container>

      <Footer />
      </div>
   );
}

export default JuiceRecipe;
