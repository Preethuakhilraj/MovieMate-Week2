const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usermodel = require('../model/usermodel');
const router = express.Router();
router.use(express.json());

router.post('/', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find the user by the name field (not username)
    const user = await usermodel.findOne({ name });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials: user not found' });
    }

    // Compare the input password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials: password mismatch' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' });

    // Respond with the token
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
