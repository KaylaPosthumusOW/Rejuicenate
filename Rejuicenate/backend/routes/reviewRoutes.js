const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // Adjust the path as necessary

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

router.get("/", async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Add a new review
router.post('/add', async (req, res) => {
    const { rating, commentText, personalTip, userId, juiceId, timestamp } = req.body;

    try {
        const newReview = new Review({
            rating,
            commentText,
            personalTip,
            userId,
            juiceId,
            isFlagged: false, // Default to not flagged
            timestamp,
        });

        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error saving review:', error);
        res.status(500).json({ message: 'Error saving review' });
    }
});

// GET reviews by juiceId (excluding flagged reviews)
router.get('/:juiceId', async (req, res) => {
    const { juiceId } = req.params;
    try {
        // Fetch only reviews that are not flagged
        const reviews = await Review.find({ juiceId, isFlagged: false }).populate('userId');
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Error fetching reviews', error });
    }
});

// Flag a review (Update isFlagged to true)
router.put("/:id/flag", async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { $set: { isFlagged: true } },
            { new: true }
        );
        if (review) {
            res.json(review);
        } else {
            res.status(404).send("Review not found");
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get flagged reviews
router.get('/flagged', async (req, res) => {
    console.log("Fetching flagged reviews...");
    try {
        const flaggedReviews = await Review.find({ isFlagged: true }).populate('userId');
        console.log("Flagged reviews found:", flaggedReviews);
        res.json(flaggedReviews);
    } catch (error) {
        console.error("Error fetching flagged reviews:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

// Unflag (approve) a flagged review (Update isFlagged to false)
router.put("/:id/unflag", async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { $set: { isFlagged: false } },
            { new: true }
        );
        if (review) {
            res.json(review);
        } else {
            res.status(404).send("Review not found");
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE: Delete a review by ID
router.delete("/:id", async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (review) {
            res.json({ message: "Review deleted" });
        } else {
            res.status(404).send("Review not found");
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// DELETE: Delete all reviews by juiceId
router.delete('/likedJuices/:juiceId', async (req, res) => {
    const { juiceId } = req.params;
    try {
        // This is where the Review model should be used
        await Review.deleteMany({ juiceId: juiceId });
        res.status(200).send({ message: 'Reviews deleted successfully.' });
    } catch (error) {
        res.status(500).send({ error: 'Error deleting reviews by juiceId: ' + error.message });
    }
});

router.delete('/juice/:juiceId', async (req, res) => {
    try {
        const juiceId = req.params.juiceId;
        await Review.deleteMany({ "juiceId.$oid": juiceId });
        res.status(200).json({ message: 'Associated reviews deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete reviews' });
    }
});


module.exports = router;
