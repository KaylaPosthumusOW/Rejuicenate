// routes/trackedData.js

const express = require('express');
const router = express.Router();
const TrackedData = require('../models/TrackedData');

// POST a new tracked data entry
router.post('/add', async (req, res) => {
  try {
    const { userId, day, dayDescription, modifications, feelings, juiceName } = req.body;

    if (!userId || !day || !dayDescription || !juiceName) {
      return res.status(400).send({ message: "User ID, day, day description, and juice name are required." });
    }

    // Creating a new TrackedData entry with juiceName instead of juiceId
    const trackingData = new TrackedData({
      userId,
      day,
      dayDescription,
      modifications,
      feelings,
      juiceName, // Save juiceName as a string
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
    const userId = req.params.userId;
    const trackingData = await TrackedData.find({ userId });
    res.status(200).json(trackingData);
  } catch (error) {
    console.error("Error fetching tracking data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
