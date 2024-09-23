import { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Typography, Grid, CircularProgress, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosinterceptor';

const Userdashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(''); // Category filter state
  const [languageFilter, setLanguageFilter] = useState(''); // Language filter state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get('/user/movies');
        setMovies(response.data || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Handle category and language selection
  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguageFilter(event.target.value);
  };

  // Filter movies based on selected category and language
  const filteredMovies = movies.filter((movie) => {
    const matchesCategory = categoryFilter ? movie.category === categoryFilter : true;
    const matchesLanguage = languageFilter ? movie.languages.includes(languageFilter) : true;
    return matchesCategory && matchesLanguage;
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#121212">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#121212">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box padding={3} marginTop={10} bgcolor="#121212" minHeight="100vh">
          {/* Filter Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" bgcolor="#333" p={2} mb={4} sx={{ height: '50px' }}>
        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#fff' }}>Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={handleCategoryChange}
            label="Category"
            sx={{
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFC107' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD54F' },
              '& .MuiSvgIcon-root': { color: '#FFC107' },
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {/* Add more categories dynamically or hardcode them */}
            <MenuItem value="UA">UA</MenuItem>
            <MenuItem value="PG">PG</MenuItem>
            <MenuItem value="A">A</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: '#fff' }}>Language</InputLabel>
          <Select
            value={languageFilter}
            onChange={handleLanguageChange}
            label="Language"
            sx={{
              color: '#fff',
              '& .MuiOutlinedInput-notchedOutline': { borderColor: '#FFC107' },
              '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#FFD54F' },
              '& .MuiSvgIcon-root': { color: '#FFC107' },
            }}
          >
            <MenuItem value="">All Languages</MenuItem>
            {/* Add more languages dynamically or hardcode them */}
            <MenuItem value="Malayalam">Malayalam</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
            <MenuItem value="Tamil">Tamil</MenuItem>
            <MenuItem value="Telugu">Telugu</MenuItem>
            <MenuItem value="English">English</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Movie Cards */}
      <Grid container spacing={4} justifyContent="center">
        {filteredMovies.length === 0 ? (
          <Typography variant="h6" color="textSecondary" align="center" sx={{ color: '#fff' }}>
            No movies found
          </Typography>
        ) : (
          filteredMovies.map((movie) => (
            <Grid item key={movie._id} xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  width: '350px', // Fixed width
                  height: '500px', // Fixed height
                  bgcolor: '#1e1e1e',
                  color: '#fff',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s',
                  ':hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={movie.image}
                  alt={movie.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" sx={{ color: '#FFC107' }}>
                    {movie.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
                    Category: {movie.category}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#BDBDBD' }}>
                    Languages: {movie.languages.join(', ')}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" marginTop={2}>
                    <Button
                      component={Link}
                      to={`/movies/${movie._id}`}
                      variant="outlined"
                      sx={{
                        borderColor: '#FFC107',
                        color: '#FFC107',
                        ':hover': { borderColor: '#FFD54F', color: '#FFD54F' },
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: '#FFC107',
                        color: '#000',
                        ':hover': { bgcolor: '#FFD54F' },
                      }}
                      onClick={() => handleNavigation(`/movies/${movie._id}/write-review`)}
                    >
                      Write a Review
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Userdashboard;
