// import Review from '../models/Review.js';

// export const getReviews = async (req, res) => {
//   try {
//     const reviews = await Review.find({ productId: req.params.productId });
//     const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;
//     res.status(200).json({ reviews, averageRating });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const addReview = async (req, res) => {
//   const { name, rating, comment } = req.body;
//   const { productId } = req.params;

//   try {
//     const newReview = new Review({ name, rating, comment, productId });
//     await newReview.save();
//     const reviews = await Review.find({ productId });
//     const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
//     res.status(201).json({ newReview, averageRating });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };


import Review from '../models/Review2.js'; // Updated import path

export const getReviews = async (req, res) => {
  try {
    const { productId } = req.query;
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

export const addReview = async (req, res) => {
  try {
    const { productId, name, rating, comment } = req.body;
    const newReview = new Review({ productId, name, rating, comment });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review' });
  }
};
