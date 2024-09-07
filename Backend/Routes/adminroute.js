const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Movie = require('../model/moviemodel');
const jwt = require('jsonwebtoken'); // Ensure you have this dependency
require('../connection/connection'); // Ensure the path is correct

// Middleware for token verification
function verifyToken(req, res, next) {
  const token = req.headers.token;
  try {
    if (!token) throw 'Unauthorized access';
    const payload = jwt.verify(token, 'your_secret_key'); // Use the same key as in signing
    if (!payload) throw 'Unauthorized access';
    next();
  } catch (error) {
    res.status(401).json({ message: error });
  }
}

// Use bodyParser for parsing JSON bodies
router.use(bodyParser.json());

// Route to get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to add a new movie
router.post('/movies', verifyToken, async (req, res) => { // Applied verifyToken if needed
  const movie = new Movie(req.body);
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete a movie
router.delete('/movies/:id', verifyToken, async (req, res) => { // Applied verifyToken if needed
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    await movie.remove();
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update movie details
router.patch('/movies/:id', verifyToken, async (req, res) => { // Applied verifyToken if needed
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    Object.assign(movie, req.body); // Update with new details
    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
