import { Col, Container, Row } from "react-bootstrap";
import '../styles/browseJuices.css'; // Ensure your CSS file is linked

// Import FontAwesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons'; // Import the comment icon

function ReviewCard({ commentText }) { // Accept comment text as a prop
  return (
    <Container>
      <Row className="g-3">
        <Col sm="12" md="6">
        <div className="review-bg p-3">
        {/* Comment Icon */}
        <FontAwesomeIcon icon={faComments} size="2x" className="comment-icon" /> 
        <p className="commentText mt-2 mx-5">{commentText}</p> 

        <div className="userInfo-bg align-content-center">
            <img className="user-img" />
            <p className="mt-1"><strong>Username and surname</strong></p>
        </div>
        </div>

        </Col>
      </Row>
    </Container>
  );
}

export default ReviewCard;
