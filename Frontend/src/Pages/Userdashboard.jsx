import { Box, Card, CardContent, CardMedia, Typography,} from '@mui/material';
import axios from 'axios';
// import axiosInstance from './axiosinterceptor'; // Ensure this is correctly configured
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Userdashboard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/movies');
        console.log('API Response:', response.data);
        setMovies(response.data || []);  // Ensure movies is an array
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchData();
  }, []);
 
  return (
    <Box display="flex" flexWrap="wrap" marginTop={20} justifyContent="space-around">
      {movies.length === 0 ? (
        <Typography variant="h6">No movies found</Typography>
      ) : (
        movies.map((movie) => (
          <Card key={movie._id} sx={{ maxWidth:700, margin: 2 }}>
            <CardMedia
              component="img"
              height="240"
              image={movie.image}
              alt={movie.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {movie.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Category: {movie.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Languages: {movie.languages.join(', ')}
              </Typography>
              <Link to={`/movies/${movie._id}`}>View Details</Link>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default Userdashboard;
