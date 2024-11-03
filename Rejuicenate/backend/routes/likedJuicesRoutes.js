const express = require('express');
const router = express.Router();
const LikedJuice = require('../models/LikedJuice');
const mongoose = require('mongoose'); // Import mongoose
const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose.Types

// GET /likedJuices - Get all liked juices for all users
router.get('/', async (req, res) => {
  try {
    const likedJuices = await LikedJuice.find().populate('juiceId');
    const juices = likedJuices.map(like => ({
      userId: like.userId,
      juice: like.juiceId // Returns the populated juice details
    }));
    res.status(200).json(juices);
  } catch (error) {
    console.error('Error fetching all liked juices:', error);
    res.status(500).json({ message: 'Error fetching liked juices.' });
  }
});

// POST route to add a liked juice
router.post('/add', async (req, res) => {
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

// DELETE route to delete a liked juice by its ID
// Assuming you have required the necessary modules and set up your router
router.delete('/deleteLikedJuiceByJuiceId/:juiceId', async (req, res) => {
  const { juiceId } = req.params;

  try {
    const objectId = new ObjectId(juiceId);

    // Find and delete all liked juices that match the juiceId
    const deletedJuices = await LikedJuice.deleteMany({ juiceId: objectId });

    if (deletedJuices.deletedCount > 0) {
      return res.status(200).send({ message: 'Liked juices deleted successfully', deletedCount: deletedJuices.deletedCount });
    } else {
      return res.status(404).send({ message: 'No liked juices found for this juiceId' });
    }
  } catch (error) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

router.delete('/juice/:juiceId', async (req, res) => {
  try {
      const juiceId = req.params.juiceId;
      await LikedJuice.deleteMany({ "juiceId.$oid": juiceId });
      res.status(200).json({ message: 'Associated likedJuices deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete likedJuices' });
  }
});



module.exports = router;
