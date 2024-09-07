import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosinterceptor';

const Image = 'https://images.pexels.com/photos/11961850/pexels-photo-11961850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

export default function Login() {
  const [user, setUser] = useState({
    name: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is an admin
    if (user.name === 'Admin' && user.password === '12345') {
      navigate('/admindashboard');
      return;
    }

    try {
      const response = await axiosInstance.post('/login', user);
      console.log(response.data);
      alert('Login Successful!');
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem("isAuthenticated", "true"); // Set as a string
        
        navigate('/userdashboard');
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response) {
        alert(error.response.data.message || 'Login failed!');
      } else {
        alert('An unexpected error occurred!');
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
        borderRadius: 2,
        backgroundColor: '#f0f2f5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '70%',
          height: '70%',
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
            padding: 2,
          }}
        >
          <Box
            component="img"
            sx={{
              height: 'auto',
              width: '90%',
              maxHeight: '90%',
              objectFit: 'cover',
              borderRadius: '5%',
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
              Welcome Back to Login!<hr />
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                id="name"
                name="name"
                label="Username"
                value={user.name}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem' }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ py: 1.5, fontSize: '1rem' }}
              >
                Sign in with Google
              </Button>
              <Typography
                sx={{ mt: 2 }}
                component={Link}
                to="/signup"
                variant="body2"
                color="primary"
              >
                Don’t have an account yet? Sign Up Now
              </Typography>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
