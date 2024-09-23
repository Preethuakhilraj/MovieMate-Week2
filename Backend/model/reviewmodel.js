const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    review: String,
    rating: Number,
    movieId: mongoose.Schema.Types.ObjectId,
  });
  
  const Review = mongoose.model('Review', reviewSchema);
  module.exports = Review;