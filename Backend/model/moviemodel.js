const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, // URL to the image
  category: { type: String, enum: ['UA', 'A', 'PG'], required: true },
  languages: [{ type: String, enum: ['Malayalam', 'Hindi', 'Tamil', 'Telugu', 'Kannada'], required: true }],
  description: { type: String, required: true },
  cast: { type: [String], required: true },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  ticketRates: { type: Number, required: true },
  noOfSeats: { type: Number, required: true },
  averageRating: { type: Number, default: 0 }, // Average rating from audience
  ticketsSoldPerDay: { type: Number, default: 0 }, // Number of tickets sold per day
  showTime: [{ type: String,enum: ['10 AM', '1 PM', '4 PM',' 10 PM'], required: true }]
});



const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
