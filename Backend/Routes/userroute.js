const express = require('express');
const router = express.Router();
const Model = require('../model/moviemodel');
const Usermodel = require('../model/usermodel');
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
        const movies = await Model.find();
        console.log(movies)
        res.status(200).json(movies);
    } catch (err) {
        console.error('Error retrieving dashboards:', err);
        res.status(500).json({ message: 'Failed to retrieve dashboards', error: err.message });
    }
});
router.get('/movies/:id', async (req, res) => {
    try {
        console.log(req.params)
        const movie = await Model.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: 'Movie not found' });
    }
        console.log(movie)
        res.status(200).json(movie);
    } catch (err) {
        console.error('Error retrieving dashboards:', err);
        res.status(500).json({ message: 'Failed to retrieve dashboards', error: err.message });
    }
});

module.exports = router;
