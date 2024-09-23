const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usermodel = require('../model/usermodel');
const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by the name field (not username)
    const user = await usermodel.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials: user not found' });
    }

    // Compare the input password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials: password mismatch' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, '111', { expiresIn: '1h' });
   
    // Respond with the token
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Hardcoded admin credentials (you can replace this with database lookups or environment variables)
const adminEmail = 'admin@example.com';
const adminPassword = '12345'; // Consider storing a hashed password instead

// Admin login route
router.post('/adminlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email matches the admin email
    if (email !== adminEmail) {
      return res.status(401).json({ message: 'Unauthorized: Incorrect email or password' });
    }

    // Verify the password (if stored as plain text)
    if (password !== adminPassword) {
      return res.status(401).json({ message: 'Unauthorized: Incorrect email or password' });
    }

     // Generate a JWT token
    const token = jwt.sign(
      { email: adminEmail },  // Include email in the payload
      '111',                  // Replace '111' with your secret key (store in env variables in production)
      { expiresIn: '1h' }     // Token expiration time
    );

    // Respond with the token
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


