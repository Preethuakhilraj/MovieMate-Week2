import { Box, Button, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Image = 'https://wallpapercave.com/wp/wp11142886.jpg';

export default function Signup() {
  const [user, setUser] = useState({
    name: '', // changed 'username' to 'name'
    password: '',
    email: '',
    phone: '',
    terms: false
  });
const navigate=useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Data sent:', user);
    try {
      const response = await axios.post('http://localhost:3000/signup', user);
      console.log(response.data);
      alert('New User registered');
      navigate('/login')
    } catch (error) {
      console.log('Error in new registration:', error);
      if (error.response) {
        console.log('Response data:', error.response.data);
      }
    }
  };

  return (
    
    <Box
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '70%',
          height: '90%',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#E6E6FA ',
            padding: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 'auto',
              width: '80%',
              maxHeight: '80%',
              objectFit: 'cover',
            }}
            alt="Employee form image"
            src={Image}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 4,
          }}
        >
          <Box sx={{ width: '80%' }}>
            <Typography variant="h4" gutterBottom>
              Sign up
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              to use all features of the application
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                id="name" // changed 'username' to 'name'
                name="name"
                label="Name"
                value={user.name}
                onChange={handleChange}
                variant="filled"
                fullWidth
                margin="normal"
              />
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                value={user.email}
                onChange={handleChange}
                variant="filled"
                fullWidth
                margin="normal"
              />
              <TextField
                required
                id="password"
                name="password"
                label="Password"
                type="password"
                value={user.password}
                onChange={handleChange}
                variant="filled"
                fullWidth
                margin="normal"
              />
              <TextField
                required
                id="phone"
                name="phone"
                label="Phone"
                value={user.phone}
                onChange={handleChange}
                variant="filled"
                fullWidth
                margin="normal"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={user.terms}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2" color="textSecondary">
                    By signing up I agree with <Link to="/terms">terms and conditions</Link>
                  </Typography>
                }
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, mb: 2 }}>
                Sign up
              </Button>
              <Typography
                sx={{ mt: 1 }}
                component={Link}
                to="/login"
                variant="body2"
                color="primary"
              >
                Already have an account? Login Now
              </Typography>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
