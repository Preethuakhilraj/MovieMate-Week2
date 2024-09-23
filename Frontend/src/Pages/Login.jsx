import { Box, Button, TextField, Typography } from '@mui/material'; 
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from './axiosinterceptor';

const Image = 'https://images.pexels.com/photos/11961850/pexels-photo-11961850.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

export default function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  // Function to decode the token and store in sessionStorage
  const handleToken = (token) => {
    if (!token) throw new Error('Token is missing from the response.');

    // Manual decoding of the JWT token
    const base64Url = token.split('.')[1]; // Get payload part of the token
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    
    const decodedToken = JSON.parse(jsonPayload);
    console.log("Decoded token:", decodedToken);

    // Save token and decoded user information in sessionStorage
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(decodedToken));
    sessionStorage.setItem('isAuthenticated', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { email, password } = userCredentials;
  
    try {
      let response;

      // Check if the user is admin
      if (email === 'admin@example.com' && password === '12345') {
        response = await axiosInstance.post('/login/adminlogin', userCredentials);
        alert('Admin Login Successful!');

        // Decode token and store for admin
        const { token } = response.data;
        handleToken(token);

        navigate('/admindashboard');
      } else {
        response = await axiosInstance.post('/login', userCredentials);
        console.log('Login response:', response.data);

        // Decode token and store for user
        const { token } = response.data;
        handleToken(token);

        alert('Login Successful!');
        navigate('/userdashboard');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred during login.');

      if (error.response) {
        if (error.response.status === 401) {
          alert('Invalid credentials. Please try again.');
        } else {
          alert(error.response.data.message || 'An unexpected error occurred during login.');
        }
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
          width: { xs: '90%', sm: '70%' }, // Responsive width
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
              Welcome Back to Login!
              <hr />
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                value={userCredentials.email}
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
                value={userCredentials.password}
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
