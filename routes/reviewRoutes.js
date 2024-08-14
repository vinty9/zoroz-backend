import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// Fetch reviews for a specific product
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Post a new review for a specific product
router.post('/:productId', async (req, res) => {
  const { name, rating, comment } = req.body;
  const { productId } = req.params;

  try {
    const newReview = new Review({
      productId,
      name,
      rating,
      comment,
    });

    const savedReview = await newReview.save();
    res.json(savedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review' });
  }
});

export default router;
