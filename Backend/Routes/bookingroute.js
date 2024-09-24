// const express = require('express');
// const Booking = require('../model/bookingmodel');
// const Movie = require('../model/moviemodel');
// const nodemailer = require('nodemailer');
// const router = express.Router();

// // Function to send email confirmation
// const sendEmailConfirmation = async (userEmail, movieName, seatNumber) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: 'moviemateictintern@gmail.com', // Use environment variables for sensitive info
//         pass: 'vfwb nkvy axvh qrtu',
//       },
//     });
//     let mailOptions = {
//       from: 'moviemateictintern@gmail.com',
//       to: userEmail,
//       subject: `Ticket Confirmation for ${movieName}`,
//       text: `Your booking is confirmed! Seat Number: ${seatNumber}`,
//     };
//    console.log(userEmail);
//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// };

// // POST /api/book-ticket
// router.post('/book-ticket', async (req, res) => {
//   const { movieId, seats, email } = req.body;

//   try {
//     // Fetch the movie details using the movieId
//     const movie = await Movie.findById(movieId);

//     if (!movie) {
//       return res.status(404).json({ message: 'Movie not found' });
//     }

//     // Check if seats are available
//     const bookedSeats = await Booking.find({ movieId }).countDocuments();
//     const availableSeats = movie.noOfSeats - bookedSeats;

//     if (availableSeats < seats.length) {
//       return res.status(400).json({ message: 'Housefull or insufficient seats available' });
//     }

//     // Assign seat numbers
//     const newBookings = seats.map((seat, index) => ({
//       movieId,
//       userEmail: email,
//       seatNumber: bookedSeats + index + 1
//     }));

//     // Save bookings
//     await Booking.insertMany(newBookings);

//     // Send email confirmation
//     await sendEmailConfirmation(email, movie.name, newBookings.map(b => b.seatNumber).join(', '));

//     // Respond with a success message and seat numbers
//     res.status(201).json({ message: 'Booking confirmed!', seats: newBookings.map(b => b.seatNumber) });
//   } catch (error) {
//     console.error('Booking error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// module.exports = router;
const express = require('express');
const Booking = require('../model/bookingmodel');
const Movie = require('../model/moviemodel');
const nodemailer = require('nodemailer');
require('dotenv').config(); // To use environment variables
const crypto = require('crypto'); // If using native crypto for other purposes
const CryptoJS = require('crypto-js'); // Import CryptoJS
const router = express.Router();

const generateSignature = (orderId, paymentId) => {
  const secret = process.env.RAZORPAY_SECRET; // Make sure this is set correctly
  const generatedSignature = CryptoJS.HmacSHA256(orderId + '|' + paymentId, secret).toString(CryptoJS.enc.Hex);
  return generatedSignature;
};
// Function to send email confirmation
const sendEmailConfirmation = async (userEmail, movieName, seatNumbers) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Ticket Confirmation for ${movieName}`,
      text: `Your booking is confirmed! Seat Numbers: ${seatNumbers}`,
    };

    console.log('Sending email to:', userEmail);
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

router.post("/bookticket/:id", async (req, res) => {
  const { id } = req.params;
  const { seats, email } = req.body;

  if (!id) {
    return res.status(400).send({ error: "Invalid movie ID" });
  }
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).send({ error: "Movie not found" });
    }

    const bookedSeats = await Booking.find({ movieId: id }).countDocuments();
    const availableSeats = movie.noOfSeats - bookedSeats;

    if (availableSeats < seats.length) {
      return res.status(400).send({ error: 'Housefull or insufficient seats available' });
    }

    const newBookings = seats.map((seat, index) => ({
      movieId: id,
      userEmail: email,
      seatNumbers: bookedSeats + index + 1
    }));

    await Booking.insertMany(newBookings);

    await sendEmailConfirmation(email, movie.name, newBookings.map(b => b.seatNumbers).join(', '));

    res.status(201).send({ message: 'Booking confirmed!', seats: newBookings.map(b => b.seatNumbers) });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Razorpay Callback Endpoint
router.post('/razorpay-callback', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    
    // Generate the expected signature
    const generatedSignature = generateSignature(razorpay_order_id, razorpay_payment_id);

    // Verify the signature
    if (generatedSignature === razorpay_signature) {
      // TODO: Update the booking status in your database here

      console.log('Payment verified and booking confirmed.');
      res.status(200).json({ message: 'Payment verified and booking confirmed' });
    } else {
      console.error('Invalid payment signature');
      res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error('Error processing Razorpay callback:', error);
    res.status(500).json({ message: 'Error processing payment' });
  }
});

module.exports = router;
