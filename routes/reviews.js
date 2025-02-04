const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// @route GET /api/reviews/:movieId
// @desc Get all reviews for a specific movie
router.get('/:movieId', async (req, res) => {
    try {
        const reviews = await Review.find({ movieId: req.params.movieId });
        res.json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route POST /api/reviews
// @desc Add a new review
router.post('/', async (req, res) => {
    const { movieId, text } = req.body;
    if (!movieId || !text) {
        return res.status(400).json({ message: 'Movie ID and review text are required' });
    }

    try {
        const newReview = new Review({ movieId, text });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (err) {
        console.error('Error adding review:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route GET /api/reviews
// @desc Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        console.error('Error fetching reviews:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route GET /api/reviews/:id
// @desc Get a specific review by ID
router.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (err) {
        console.error('Error fetching review:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route DELETE /api/reviews/:id
// @desc Delete a review by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.id);
        if (!deletedReview) return res.status(404).json({ message: 'Review not found' });
        res.json({ message: 'Review deleted successfully' });
    } catch (err) {
        console.error('Error deleting review:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route PUT /api/reviews/:id
// @desc Update a review's text by ID
router.put('/:id', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Review text is required' });
    }

    try {
        const updatedReview = await Review.findByIdAndUpdate(
            req.params.id,
            { text },
            { new: true }
        );

        if (!updatedReview) return res.status(404).json({ message: 'Review not found' });
        res.json(updatedReview);
    } catch (err) {
        console.error('Error updating review:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;