import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Button} from '@mui/material';
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
        const response = await axiosInstance.get(`/user/movies/${id}`);
        setMovie(response.data || {}); // Ensure movie is an object
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Box p={4} marginTop={20}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems="flex-start"
        justifyContent="space-between"
        gap={4}
      >
        <Box
          flex={1}
          component="img"
          src={movie.poster}
          alt={movie.name}
          width={{ xs: '100%', md: '50%' }}
          height="auto"
          sx={{ borderRadius: 2 }}
        />
        <Box flex={1} p={2}>
          <Typography variant="h3" gutterBottom>
            {movie.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography paragraph>
            {movie.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Cast
          </Typography>
          <Typography paragraph>
            {movie.cast ? movie.cast.join(', ') : 'No cast information available'}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Ticket Availability
          </Typography>
          <Typography paragraph>
            {movie.noOfSeats !== undefined && movie.ticketsSoldPerDay !== undefined
              ? getTicketAvailability(movie.noOfSeats, movie.ticketsSoldPerDay)
              : 'Loading availability...'}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 4 }}
            component={Link}
            to={{
              pathname: `/movies/${movie._id}/book-ticket`,
              state: { movie }
            }}
          >
            Book Ticket
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

// Define the expected prop types
Moviedetails.propTypes = {
  id: PropTypes.string.isRequired,
};
