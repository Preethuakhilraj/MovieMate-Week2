const express = require('express'); 
const router = express.Router();
const bodyParser = require('body-parser');
const Movie = require('../model/moviemodel');
const jwt = require('jsonwebtoken'); // Ensure you have this dependency
require('../connection/connection'); // Ensure the path is correct

// Middleware for token verification
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }
  const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
  try {
    const payload = jwt.verify(token, 'your_secret_key');
    if (!payload) throw 'Unauthorized access';
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}


// Use bodyParser for parsing JSON bodies
router.use(bodyParser.json());
router.get('/movies/:movieId', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    console.log(movie);
    
    // Check if the movie was found
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Return the found movie
    res.status(200).json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error.message);
    res.status(500).json({ message: 'Failed to fetch the movie.' });
  }
});

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
router.post('/movies', async (req, res) => {
  try {
    console.log('Request Body:', req.body);  // Log the request body for debugging

    const { name, image, category, languages, cast, description, ticketRates, noOfSeats } = req.body;
    
    if (!name || !image || !category || !languages || !cast || !description || !ticketRates || !noOfSeats) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newMovie = new Movie({
      name,
      image,
      category,
      languages,  // Expecting arrays
      cast,       // Expecting arrays
      description,
      ticketRates,
      noOfSeats
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Error saving movie:', error.message);
    res.status(500).json({ message: 'Failed to add the movie' });
  }
});


// Route to delete a movie
router.delete('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    console.log(movie);
    if (movie == null) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to update movie details
router.patch('/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    if (req.body.languages) {
      req.body.languages = req.body.languages.toString();
    }
    if (req.body.cast) {
      req.body.cast = req.body.cast.toString();
    }

    Object.assign(movie, req.body);
    const updatedMovie = await movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;