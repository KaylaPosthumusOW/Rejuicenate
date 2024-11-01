// routes/trackedData.js

const express = require('express');
const router = express.Router();
const TrackedData = require('../models/TrackedData');

// POST a new tracked data entry
router.post('/add', async (req, res) => {
  try {
    const { userId, day, dayDescription, modifications, feelings, juiceId } = req.body;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required." });
    }

    const trackingData = new TrackedData({
      userId,
      day,
      dayDescription,
      modifications,
      feelings,
      juiceId,
    });

    await trackingData.save();
    res.status(201).send(trackingData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// GET tracked data for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const trackedData = await TrackedData.find({ userId: req.params.userId }).populate('juiceId');
    res.status(200).json(trackedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
