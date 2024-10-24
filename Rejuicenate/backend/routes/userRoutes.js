const express = require('express');
const User = require('../models/User'); // Adjust the path as necessary
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const router = express.Router();
const jwt = require("jsonwebtoken"); // You may want to use this for token generation later

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

        // Optionally, you can create a JWT token here
        // const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

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
        return res.status(401).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
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
