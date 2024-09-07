const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // URL to the image
  category: { type: String, enum: ['UA', 'A', 'PG'], required: true },
  languages: [{ type: String, enum: ['Malayalam', 'Hindi', 'Tamil', 'Telugu', 'English'], required: true }],
  poster: { type: String, required: true }, // URL to the poster image
  description: { type: String, required: true },
  cast: { type: [String], required: true },
  reviews: [{ reviewer: String, comment: String, rating: Number }],
  ticketRates: { type: Number, required: true },
  noOfSeats: { type: Number, required: true },
  averageRating: { type: Number, default: 0 },
  ticketsSoldPerDay: { type: Number, default: 0 },
  showTimings: [{ type: String }]
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
