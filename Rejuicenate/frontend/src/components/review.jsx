import '../styles/browseJuices.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons'; 
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons'; 
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

function ReviewCard({ commentText, personalTip, userProfileImage, userName, rating, isFlagged, onFlag }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon 
          key={i} 
          icon={i <= rating ? solidStar : regularStar} 
          className="star-icon" 
        />
      );
    }
    return stars;
  };

  const profileImageUrl = userProfileImage 
    ? `${apiUrl}/profileImages/${userProfileImage}` 
    : 'http://localhost:5001/images/default.png';

  return (
    <div className="review-bg p-3 mb-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon className="comment-icon me-2" icon={faComments} size="2x" />
          <div className="stars mb-1">{renderStars(rating)}</div>
        </div>
        <FontAwesomeIcon 
          icon={faFlag} 
          style={{ cursor: 'pointer', color: isFlagged ? 'red' : 'gray' }} 
          onClick={onFlag} 
        />
      </div>
      <p className=" mt-2 mx-5">{commentText}</p>
      <p className="commentText personalTip mt-2 mx-5">
      <FontAwesomeIcon icon={faLightbulb} className="me-2" /> {personalTip ? personalTip : 'No personal tip provided.'}
      </p>
      <div className="userInfo-bg align-content-center">
        <img src={profileImageUrl} alt="User" className="user-img" />
        <p><strong>{userName}</strong></p>
      </div>
    </div>
  );
}

export default ReviewCard;
