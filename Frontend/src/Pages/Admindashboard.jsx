// AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosinterceptor';

const AdminDashboard = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axiosInstance.get('/user/movies');
      setMovies(response.data || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const deleteMovie = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this movie?');
    if (confirmed) {
      try {
        await axiosInstance.delete(`/admin/movies/${id}`);
        alert('Movie deleted successfully');
        fetchMovies();
      } catch (error) {
        console.error('Error deleting movie:', error);
      }   }
  };
  

  return (
    <div style={{ marginTop: '120px', backgroundColor: '#000', color: '#fff', padding: '20px' }}>
      <h1 style={{ textAlign: 'center'}}>
            
      </h1>
      <Button   variant="outlined"
                      sx={{
                        borderColor: '#FFC107',
                        color: '#FFC107',position: 'absolute', right: '40px',top: '130px',
                        ':hover': { borderColor: 'black',backgroundColor: '#FFC107' ,color: '#000' },
                      }}
                    //  style={{ backgroundColor: '#ffcc00', color: '#000', top: '150px',position: 'absolute',right: '40px' }}
       onClick={() => navigate('/add-movie')} >
        Add Movie
      </Button>
        {/* // variant="contained"
        // style={{ backgroundColor: '#ffcc00', color: '#000', position: 'absolute', right: '20px', top: '10px' }}
        // onClick={() => navigate('/add-movie')} */}
           <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: '#ffcc00'}}>Image</TableCell>
            <TableCell style={{ color: '#ffcc00' }}>Movie Name</TableCell>
            <TableCell style={{ color: '#ffcc00' }}>Category</TableCell>
            <TableCell style={{ color: '#ffcc00' }}>Languages</TableCell>
            <TableCell style={{ color: '#ffcc00' }}>Average Rating</TableCell>
            <TableCell style={{ color: '#ffcc00' }}>Tickets Sold/Day</TableCell>
            <TableCell style={{ color: '#ffcc00' }}>Show Time</TableCell>
            <TableCell style={{ color: '#ffcc00' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map((movie) => (
            <TableRow key={movie._id}>
              <TableCell>
                <img src={movie.image} alt={movie.name} style={{ width: '100px' }} />
              </TableCell>
              <TableCell style={{ color: '#fff' }}>{movie.name}</TableCell>
              <TableCell style={{ color: '#fff' }}>{movie.category}</TableCell>
              <TableCell style={{ color: '#fff' }}>{movie.languages.join(', ')}</TableCell>
              <TableCell style={{ color: '#fff' }}>{movie.averageRating ? movie.averageRating.toFixed(1) : '4.5'}</TableCell>
              <TableCell style={{ color: '#fff' }}>{movie.ticketsSoldPerDay || '80'}</TableCell>
              <TableCell style={{ color: '#fff' }}>{movie.showTime|| 'N/A'}</TableCell>
              <TableCell>
                <IconButton onClick={() => navigate(`/edit-movie/${movie._id}`)} style={{ color: '#ffcc00' }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => deleteMovie(movie._id)} style={{ color: '#ffcc00' }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminDashboard;
