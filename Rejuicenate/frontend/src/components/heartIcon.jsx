// HeartIcon.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons'; 
import { faHeart as faRegHeart } from '@fortawesome/free-regular-svg-icons'; 

const HeartIcon = ({ isLiked, onLike }) => (
  <div 
    onClick={onLike} 
    style={{ cursor: 'pointer', fontSize: '24px' }}
  >
    <FontAwesomeIcon 
      icon={isLiked ? faHeart : faRegHeart} 
      className="heart-icon" 
      style={{ color: isLiked ? 'red' : 'black' }} 
    />
  </div>
);

export default HeartIcon;
