import { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography } from '@mui/material';
import axiosInstance from './axiosinterceptor';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditMovie = () => {
  const [movie, setMovie] = useState({
    name: '',
    image: '',
    category: '',
    languages: '',
    cast: '',
    description: '',
    ticketRates: '',
    noOfSeats: '',
    showTime: '' // Updated showTime to manage it as a string initially
  });

  const { id } = useParams(); // Get movie ID from URL if editing
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axiosInstance.get(`/admin/movies/${id}`);
        setMovie({
          ...response.data,
          languages: response.data.languages.join(', '),
          cast: response.data.cast.join(', '),
          showTime: response.data.showTime.join(', ') // Format showTime as a comma-separated string
        });
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    if (isEdit) {
      fetchMovie();
    }
  }, [id, isEdit]); // Keep the dependencies related to the id
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };
  
  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const movieData = {
        ...movie,
        languages: typeof movie.languages === 'string' ? movie.languages.split(',').map(lang => lang.trim()) : movie.languages,
        cast: typeof movie.cast === 'string' ? movie.cast.split(',').map(c => c.trim()) : movie.cast,
        showTime: typeof movie.showTime === 'string' ? movie.showTime.split(',').map(time => time.trim()) : movie.showTime // Process showTime similarly
      };

      console.log('Submitting Movie Data:', movieData); // Log the payload

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (isEdit) {
        await axiosInstance.patch(`/admin/movies/${id}`, movieData, config);
        alert('Movie updated successfully');
      } else {
        await axiosInstance.post('/admin/movies', movieData, config);
        alert('Movie added successfully');
      }
      navigate('/admindashboard');
    } catch (error) {
      console.error('Error saving movie:', error);
      alert(`Error saving movie: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      style={{
        marginTop: '120px', 
        backgroundColor: '#1c1c1c', 
        padding: '40px', 
        borderRadius: '8px',
        color: '#fff'
      }}
    >
      <Typography variant="h4" align="center" gutterBottom style={{ color: '#ffeb3b' }}>
        {isEdit ? 'Edit Movie' : 'Add Movie'}
      </Typography>
      <form>
        <TextField
          label="Movie Name"
          name="name"
          value={movie.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Enter movie name"
          InputLabelProps={{ style: { color: '#ffeb3b' } }}
          InputProps={{ style: { color: '#fff', borderColor: '#ffeb3b' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffeb3b' },
              '&:hover fieldset': { borderColor: '#fff' }
            }
          }}
        />
        <TextField
          label="Image URL"
          name="image"
          value={movie.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Enter image URL"
          InputLabelProps={{ style: { color: '#ffeb3b' } }}
          InputProps={{ style: { color: '#fff', borderColor: '#ffeb3b' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffeb3b' },
              '&:hover fieldset': { borderColor: '#fff' }
            }
          }}
        />
        <TextField
          label="Category"
          name="category"
          value={movie.category}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Enter category (UA, A, PG)"
          InputLabelProps={{ style: { color: '#ffeb3b' } }}
          InputProps={{ style: { color: '#fff', borderColor: '#ffeb3b' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffeb3b' },
              '&:hover fieldset': { borderColor: '#fff' }
            }
          }}
        />
        <TextField
          label="Languages (comma-separated)"
          name="languages"
          value={movie.languages}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Enter languages (e.g. English, Hindi)"
          InputLabelProps={{ style: { color: '#ffeb3b' } }}
          InputProps={{ style: { color: '#fff', borderColor: '#ffeb3b' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffeb3b' },
              '&:hover fieldset': { borderColor: '#fff' }
            }
          }}
        />
        <TextField
          label="Cast (comma-separated)"
          name="cast"
          value={movie.cast}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Enter cast (e.g. Actor 1, Actor 2)"
          InputLabelProps={{ style: { color: '#ffeb3b' } }}
          InputProps={{ style: { color: '#fff', borderColor: '#ffeb3b' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffeb3b' },
              '&:hover fieldset': { borderColor: '#fff' }
            }
          }}
        />
        <TextField
          label="Description"
          name="description"
          value={movie.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="normal"
          placeholder="Enter movie description"
          InputLabelProps={{ style: { color: '#ffeb3b' } }}
          InputProps={{ style: { color: '#fff', borderColor: '#ffeb3b' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffeb3b' },
              '&:hover fieldset': { borderColor: '#fff' }
            }
          }}
        />
        <TextField
          label="Ticket Rates"
          name="ticketRates"
          type="number"
          value={movie.ticketRates}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Enter ticket price"
          InputLabelProps={{ style: { color: '#ffeb3b' } }}
          InputProps={{ style: { color: '#fff', borderColor: '#ffeb3b' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffeb3b' },
              '&:hover fieldset': { borderColor: '#fff' }
            }
          }}
        />
        <TextField
          label="No. of Seats"
          name="noOfSeats"
          type="number"
          value={movie.noOfSeats}
          onChange={handleChange}
          fullWidth
          margin="normal"
          placeholder="Enter total number of seats"
          InputLabelProps={{ style: { color: '#ffeb3b' } }}
          InputProps={{ style: { color: '#fff', borderColor: '#ffeb3b' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffeb3b' },
              '&:hover fieldset': { borderColor: '#fff' }
            }
          }}
        />
        <TextField
          label="Show Time (comma-separated)"
          name="showTime" // Ensure this matches the state
          value={movie.showTime} // Bind to state
          onChange={handleChange} // Handle change
          fullWidth
          margin="normal"
          placeholder="Enter show times ['10 AM', '1PM', '4 PM',' 10PM']"
          InputLabelProps={{ style: { color: '#ffeb3b' } }}
          InputProps={{ style: { color: '#fff', borderColor: '#ffeb3b' } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#ffeb3b' },
              '&:hover fieldset': { borderColor: '#fff' }
            }
          }}
        />
       <Button
  variant="contained"
  fullWidth
  onClick={handleSubmit}
  sx={{
    mt: 2, // margin-top shorthand
    backgroundColor: '#ffeb3b',
    color: '#000',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#ffeb3b',
    },
  }}
>
  {isEdit ? 'Update Movie' : 'Add Movie'}
</Button>

<Button
  variant="outlined"
  fullWidth
  onClick={() => navigate('/admindashboard')} // Corrected navigation handler
  sx={{
    mt: 2,
   // margin-left shorthand
    color: '#ffeb3b',
    borderColor: '#ffeb3b',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#ffeb3b',
      color: '#000',
    },
  }}
>
  Cancel
</Button>

      </form>
    </Container>
  );
};
export default AddEditMovie; 