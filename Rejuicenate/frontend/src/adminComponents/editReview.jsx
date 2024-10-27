import '../styles/browseJuices.css';
import '../adminStyles/editReview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

function EditReviewCard({ commentText, personalTip, userProfileImage, userName, rating, isFlagged, onUnflag, onDelete }) {
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
        ? `http://localhost:5001/profileImages/${userProfileImage}` 
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
                    onClick={onUnflag} 
                />
            </div>
            <p className=" mt-2 mx-5">{commentText}</p>
            <p className="commentText2 personalTip mt-2 mx-5">
                <FontAwesomeIcon icon={faLightbulb} className="me-2" /> 
                {personalTip ? personalTip : 'No personal tip provided.'}
            </p>
            <div>
                <div className="userInfo-bg align-content-center">
                    <img src={profileImageUrl} alt="User" className="user-img" />
                    <p className="mt-3"><strong>{userName}</strong></p>
                </div>
                <div className="button-container">
                    <button className="icon-button-check" onClick={onUnflag}>
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </button>
                    <button className="icon-button-trash" onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditReviewCard;
