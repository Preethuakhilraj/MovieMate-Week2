const express = require('express');
const Booking = require('../model/bookingmodel');
const Movie = require('../model/moviemodel');
const nodemailer = require('nodemailer');
const router = express.Router();

// Function to send email confirmation
const sendEmailConfirmation = async (userEmail, movieName, seatNumber) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'moviemateictintern@gmail.com', // Use environment variables for sensitive info
        pass: 'vfwb nkvy axvh qrtu',
      },
    });
    let mailOptions = {
      from: 'moviemateictintern@gmail.com',
      to: userEmail,
      subject: `Ticket Confirmation for ${movieName}`,
      text: `Your booking is confirmed! Seat Number: ${seatNumber}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// POST /api/book-ticket
router.post('/book-ticket', async (req, res) => {
  const { movieId, seats, email } = req.body;

  try {
    // Fetch the movie details using the movieId
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Check if seats are available
    const bookedSeats = await Booking.find({ movieId }).countDocuments();
    const availableSeats = movie.noOfSeats - bookedSeats;

    if (availableSeats < seats.length) {
      return res.status(400).json({ message: 'Housefull or insufficient seats available' });
    }

    // Assign seat numbers
    const newBookings = seats.map((seat, index) => ({
      movieId,
      userEmail: email,
      seatNumber: bookedSeats + index + 1
    }));

    // Save bookings
    await Booking.insertMany(newBookings);

    // Send email confirmation
    await sendEmailConfirmation(email, movie.name, newBookings.map(b => b.seatNumber).join(', '));

    // Respond with a success message and seat numbers
    res.status(201).json({ message: 'Booking confirmed!', seats: newBookings.map(b => b.seatNumber) });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
