// routes/likedJuices.js
const express = require('express');
const router = express.Router();
const LikedJuice = require('../models/LikedJuice');

// POST route to add a liked juice
router.post('/', async (req, res) => {
  const { userId, juiceId } = req.body;

  try {
    // Check if the like already exists to prevent duplicates
    const existingLike = await LikedJuice.findOne({ userId, juiceId });
    if (existingLike) {
      return res.status(400).json({ message: 'Juice already liked.' });
    }

    const likedJuice = new LikedJuice({ userId, juiceId });
    await likedJuice.save();
    res.status(201).json({ message: 'Juice liked successfully!' });
  } catch (error) {
    console.error('Error liking juice:', error);
    res.status(500).json({ message: 'Error liking juice.' });
  }
});

// GET /likedJuices/:userId - Get all liked juices for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const likedJuices = await LikedJuice.find({ userId }).populate('juiceId');
    const juices = likedJuices.map(like => like.juiceId);
    res.status(200).json(juices);
  } catch (error) {
    console.error('Error fetching liked juices:', error);
    res.status(500).json({ message: 'Error fetching liked juices.' });
  }
});

// DELETE route to unlike a juice
router.delete('/:userId/:juiceId', async (req, res) => {
  try {
    const result = await LikedJuice.findOneAndDelete({ userId: req.params.userId, juiceId: req.params.juiceId });
    
    if (!result) {
      return res.status(404).json({ message: 'Liked juice not found.' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Error unliking juice:', error);
    res.status(500).json({ message: 'Error unliking juice.' });
  }
});

module.exports = router;
