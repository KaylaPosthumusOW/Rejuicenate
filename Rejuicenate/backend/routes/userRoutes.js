const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');

const router = express.Router();
const jwt = require("jsonwebtoken"); // You may want to use this for token generation later

// upload.js
const multer = require('multer');
const path = require('path');

// Set storage engine for multer
const storage = multer.diskStorage({
  destination: './profileUploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Use timestamp to avoid filename conflicts
  }
});

// Create the multer upload instance
const upload = multer({
  storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allowed file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!'); // Error if file type is invalid
    }
  }
}).single('profile_image'); // Expect a single file with the field name 'profile_image'

// Update user profile
router.put('/updateProfile/:id', upload, async (req, res) => {
  const { id } = req.params;
  const { name, surname, email } = req.body;

  try {
    const updatedData = {
      name,
      surname,
      email,
      profile_image: req.file ? req.file.filename : undefined, // Use filename from multer if exists
    };

    // Find user by ID and update their details
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password: _, ...userResponse } = user.toObject(); // Exclude password from response
    res.status(200).json(userResponse); // Return updated user data without password
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new user
router.post('/add', async (req, res) => {
  const { name, surname, email, password, user_type } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user
    user = new User({
      name,
      surname,
      email,
      password: hashedPassword,
      user_type,
    });

    // Save the user to the database
    await user.save();

    // Respond with the created user (exclude password for security)
    const { password: _, ...userResponse } = user.toObject(); // Exclude password from response
    res.status(201).json({ msg: 'User created successfully', user: userResponse });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// POST /users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const { password: _, ...userDetails } = user.toObject(); // Exclude password

    res.status(200).json({ message: 'Login successful', token, user: userDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
