const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    enum: ['standard', 'admin'], // Allowed values
    default: 'standard', // Default value for user_type
  },
  profile_image: {
    type: String, // You can store a URL to the image or a file path
    default: 'default.jpg', // Default profile image
  },
  added_at: {
    type: Date,
    default: Date.now, // Automatically set the current date and time when the user is added
  },
});

// Create the User model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
