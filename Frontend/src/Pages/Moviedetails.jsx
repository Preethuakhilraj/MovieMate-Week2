import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button, Card, CardContent, Rating } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from './axiosinterceptor';

export default function Moviedetails() {
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  const getTicketAvailability = (noOfSeats, ticketsSoldPerDay) => {
    const availableSeats = noOfSeats - ticketsSoldPerDay;
    if (availableSeats === 0) {
      return 'Housefull';
    } else if (availableSeats <= 10) {
      return 'Fast Filling';
    } else {
      return 'Available';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await axiosInstance.get(`/user/movies/${id}`);
        setMovie(movieResponse.data || {});
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box p={4} mt={15} sx={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        {/* Movie Poster */}
        <Box flex={1} component="img" src={movie.image} alt={movie.name} sx={{ width: '100%',        // Set width to 100% to fit the container width
    maxHeight: '500px',    // Limit the height to 300px (or any desired value)
    objectFit: 'cover',    // Ensures the image scales nicely without distortion
    borderRadius: 2, boxShadow: 3 }} />
        
        {/* Movie Details */}
        <Box flex={1} p={2} pt={15}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#FFD700' }}>{movie.name}</Typography>
          <Typography variant="h6" gutterBottom>Description</Typography>
          <Typography paragraph>{movie.description}</Typography>

          <Typography variant="h6" gutterBottom>Cast</Typography>
          <Typography paragraph>{movie.cast ? movie.cast.join(', ') : 'No cast information available'}</Typography>

          <Typography variant="h6" gutterBottom>Ticket Availability</Typography>
          <Typography sx={{ fontWeight: 'bold', color: '#FFD700' }} >{movie.noOfSeats && movie.ticketsSoldPerDay !== undefined ? getTicketAvailability(movie.noOfSeats, movie.ticketsSoldPerDay) : 'Loading availability...'}</Typography>

          <Button variant="outlined" color="primary" sx={{ mt: 5, borderColor: '#FFD700', color: '#FFD700', '&:hover': { backgroundColor: '#FFD700', color: '#000' } }} component={Link} to={`/movies/${movie._id}/book-ticket`}>
            Book Ticket
          </Button>
        </Box>
      </Box>

      {/* Reviews Section */}
      <Box mt={4}>
        <Typography variant="h4" gutterBottom sx={{ color: '#FFD700' }}>Reviews</Typography>
        {movie.reviews && movie.reviews.length > 0 ? (
          movie.reviews.map((review, index) => (
            <Card key={index} sx={{ mb: 2, boxShadow: 4, backgroundColor: '#1c1c1c', color: '#fff' }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" sx={{ color: '#FFD700' }}>{review.userId.name}</Typography>
                  <Rating value={review.rating} readOnly sx={{ color: '#FFD700' }} />
                </Box>
                <Typography variant="body1" sx={{ mt: 1, color: '#e0e0e0' }}>{review.review}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
  No reviews yet. Be the first to 
  <Link 
    to={`/movies/${id}/write-review`} 
    style={{ color: '#FFC107', textDecoration: 'none', fontWeight: 'bold' }}
  >
    {" "}review this movie!
  </Link>
</Typography>
        )}
      </Box>
    </Box>
  );
}

// Define the expected prop types
Moviedetails.propTypes = {
  id: PropTypes.string,
};
