import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const AdminDashboard = () => {
 
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
    <div style={{ marginTop: '50px' }}>
      <h1>Admin Dashboard</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Movie Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Languages</TableCell>
            <TableCell>Average Rating</TableCell>
            <TableCell>Tickets Sold/Day</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movies.map(movie => (
            <TableRow key={movie._id}>
              <TableCell><img src={movie.image} alt={movie.name} style={{ width: '100px' }} /></TableCell>
              <TableCell>{movie.name}</TableCell>
              <TableCell>{movie.category}</TableCell>
              <TableCell>{movie.languages.join(', ')}</TableCell>
              <TableCell>{movie.averageRating.toFixed(1)}</TableCell>
              <TableCell>{movie.ticketsSoldPerDay}</TableCell>
              <TableCell>
                <IconButton onClick={() => {/* Handle Edit */}}><EditIcon /></IconButton>
                <IconButton onClick={() => deleteMovie(movie._id)}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={() => {/* Handle Add Movie */}}>
        Add Movie
      </Button>
      <Button variant="contained" color="secondary" onClick={() => {/* Handle Logout */}}>
        Logout
      </Button>
    </div>
  );
};

export default AdminDashboard;
