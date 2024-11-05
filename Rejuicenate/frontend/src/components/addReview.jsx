import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import PrimaryBtn from '../Buttons/primaryBtn';

const AddReview = ({ juiceId, userId, onAddReview }) => {
  const [rating, setRating] = useState(0); // Store the rating (1 to 5 stars)
  const [hoverRating, setHoverRating] = useState(0); // Track hovered star for visual feedback
  const [commentText, setCommentText] = useState('');
  const [personalTip, setPersonalTip] = useState(''); // Optional field for tips
  const [loading, setLoading] = useState(false); // Disable form during submission

  const apiUrl = process.env.REACT_APP_API_URL;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const reviewData = {
      rating,
      commentText,
      personalTip,
      userId,
      juiceId,
      isFlagged: false,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post(`${apiUrl}/reviews/add`, reviewData);
      console.log('Review added:', response.data);

      // Call the onAddReview function to update the parent state with the new review
      onAddReview(response.data);

      // Clear the form fields
      setRating(0); 
      setCommentText('');
      setPersonalTip(''); 

    } catch (error) {
      console.error('Error adding review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addReviewForm">
    <h2>Share Your Experience</h2>
            <p>
               Tried this juice? Let the community know how it tasted, how it made you feel, 
               and whether it helped you on your wellness journey. Your feedback helps others discover their favorites!
            </p>
    <Form  onSubmit={handleSubmit}>
      {/* Rating Field */}
      <Form.Group className="mb-3">
        <Form.Label><strong>Rating</strong></Form.Label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={faStar}
              className={`star ${star <= (hoverRating || rating) ? 'filled' : ''}`}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '5px' }}
            />
          ))}
        </div>
      </Form.Group>

      {/* Comment Textarea */}
      <Form.Group className="mb-3">
        <Form.Label><strong>Comment</strong></Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Share your thoughts! Was it refreshing? Help with any symptoms?"
          required
          className="form-control"
        />
      </Form.Group>

      {/* Personal Tip (Optional) */}
      <Form.Group className="mb-3">
        <Form.Label><strong>Personal Tip (Optional)</strong></Form.Label>
        <Form.Control
          type="text"
          value={personalTip}
          onChange={(e) => setPersonalTip(e.target.value)}
          placeholder="When do you love drinking it? Any tweaks you made?"
          className="form-control"
        />
      </Form.Group>

      {/* Submit Button */}
      <PrimaryBtn variant="primary" type="submit" disabled={loading} label="Submit Review">
        {loading ? 'Submitting...' : 'Submit Review'}
      </PrimaryBtn>
    </Form>
    </div>
  );
};

export default AddReview;
