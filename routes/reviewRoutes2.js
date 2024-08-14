import express from 'express';
import { getReviews, addReview } from '../controllers/Review.js';

const router = express.Router();

router.get('/', getReviews);
router.post('/', addReview);

export default router;
