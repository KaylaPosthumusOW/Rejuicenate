const express = require('express');
const router = express.Router();
const Review = require('../models/Review'); // Mongoose model for reviews

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
router.delete('/deleteByJuiceId/:juiceId', async (req, res) => {
    const { juiceId } = req.params;
    try {
        const result = await Review.deleteMany({ juiceId });
        if (result.deletedCount > 0) {
            res.json({ message: 'All reviews for this juice were deleted' });
        } else {
            res.status(404).json({ message: 'No reviews found for this juice' });
        }
    } catch (error) {
        console.error('Error deleting reviews by juiceId:', error);
        res.status(500).json({ message: 'Error deleting reviews by juiceId' });
    }
});

module.exports = router;
