const express = require('express');
const router = express.Router();
const Juice = require('../models/Juice');
const multer = require('multer');
const path = require('path');

// Route to get all juices
router.get('/', async (req, res) => {
    try {
      const juices = await Juice.find();
      res.status(200).json(juices);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// Backend route to fetch a juice by ID
// Backend: Get juice by ID and populate the category field
router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find the juice and populate the category
      const juice = await Juice.findById(id).populate('category_id');
  
      if (!juice) {
        return res.status(404).json({ error: 'Juice not found' });
      }
  
      res.json(juice); // Send populated juice data
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with timestamp
  }
});

const upload = multer({ storage: storage });

// Route to add a new juice
router.post('/add', upload.single('image'), async (req, res) => {
  const { juiceName, ingredients, instructions, category_id } = req.body;

  if (!juiceName || !ingredients || !instructions || !category_id || !req.file) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const imageUrl = req.file.path; // Path to the saved image
    const newJuice = new Juice({
      juiceName,
      ingredients,
      instructions,
      category_id,
      image: imageUrl, // Save image path to the database
    });

    await newJuice.save();
    res.status(201).json({ message: 'Juice added successfully!' });
  } catch (error) {
    console.error('Error saving juice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
