const express = require('express');
const router = express.Router();
const Movie = require('../model/moviemodel');
const Usermodel = require('../model/usermodel');
const Review = require('../model/reviewmodel');
const BookedTicket= require('../model/bookingmodel');
const auth=require('../Middleware/Auth')
 // Ensure the correct path to your model file

require('../connection/connection'); // Ensure the correct path to your connection file

router.get('/getuser', auth, async (req, res) => {
  try {
    const user = req.user; // User is now populated by the authentication middleware
console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Respond with user data
    res.json({ email: user.email, name: user.name });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find().limit(10); // Example limit for pagination
    res.status(200).json(movies);
  } catch (err) {
    console.error('Error retrieving dashboards:', err);
    res.status(500).json({ message: 'Failed to retrieve dashboards', error: err.message });
  }
});

router.get('/movies/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId).populate({
      path: 'reviews',
      populate: {
        path: 'userId',
        model: "user"
    }
    })
    console.log(movie)
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
      
    }
    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error.message);
    res.status(500).json({ message: 'Failed to fetch the movie.' });
  }
});

router.post('/movies/:movieId/review', async (req, res) => {
  const { movieId } = req.params;
  const { userId, review, rating } = req.body;

  if (!userId || !review || !rating) {
    return res.status(400).json({ message: 'Missing required fields: userId, review, or rating.' });
  }

  try {
    // Check if the user has already submitted a review for the same movie
    const existingReview = await Review.findOne({ userId, movieId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this movie.' });
    }

    // Create and save new review
    const newReview = new Review({ userId, review, rating, movieId });
    await newReview.save();

    // Update movie's reviews array
    await Movie.findByIdAndUpdate(
      movieId,
      { $push: { reviews: newReview._id } },
      { new: true }
    );

    res.status(200).json({ message: 'Review submitted successfully!' });
  } catch (error) {
    console.error('Error during review submission:', error.message);
    res.status(500).json({ message: 'Failed to submit the review. Please try again.' });
  }
});

// Update Review
router.put('/movies/:movieId/review/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { userId, review, rating } = req.body;

  if (!userId || !review || !rating) {
    return res.status(400).json({ message: 'Missing required fields: userId, review, or rating.' });
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { review, rating },
      { new: true }
    );

    res.status(200).json({ message: 'Review updated successfully!', updatedReview });
  } catch (error) {
    console.error('Error during review update:', error.message);
    res.status(500).json({ message: 'Failed to update the review. Please try again.' });
  }
});
router.delete('movies/:id',async (req, res) => {
  try {
    const movieId = req.params.id;
    
    // Find the movie by ID and delete it
    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted successfully', deletedMovie });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting movie', error: error.message });
  }
});
// Delete Review
router.delete('/movies/:movieId/review/:reviewId', async (req, res) => {
  const { reviewId, movieId } = req.params;

  try {
    await Review.findByIdAndDelete(reviewId);
    await Movie.findByIdAndUpdate(movieId, { $pull: { reviews: reviewId } });

    res.status(200).json({ message: 'Review deleted successfully!' });
  } catch (error) {
    console.error('Error during review deletion:', error.message);
    res.status(500).json({ message: 'Failed to delete the review. Please try again.' });
  }
});

// Updated backend route for fetching booked tickets
router.get('/booked-tickets', async (req, res) => {
  try {
    const { email } = req.query;

    // Logging for debugging purposes
    console.log('Email:', email);

    // If no email is provided, return a 400 Bad Request response
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Query the database to find tickets based on the provided user email
    const tickets = await BookedTicket.find({ userEmail: email }).populate({
      path: 'movieId',
      select: '_id name showTime'
    });

    // If no tickets are found, return a 404 Not Found response
    if (!tickets || tickets.length === 0) {
      return res.status(404).json({ message: "No tickets found for this user" });
    }

    // If tickets are found, return them in the response
    res.status(200).json(tickets);
  } catch (error) {
    // Enhanced logging for better error tracking
    console.error('Error fetching booked tickets:', error);
    res.status(500).json({ message: "Error fetching booked tickets", error });
  }
});



// Cancel a ticket by ticket ID
router.post('/cancel-ticket/:ticketId', async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await BookedTicket.findByIdAndDelete(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling ticket", error });
  }
});
module.exports = router;
