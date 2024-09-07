const express = require('express');
const router = express.Router();
const usermodel = require('../model/usermodel');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
require('../connection/connection');

router.post('/', async (req, res) => {
  try {
    const { name, password, email, phone } = req.body;
    if (!name || !password || !email || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Hash the password before saving
const hashedPassword = await bcrypt.hash(password, 10);
console.log(hashedPassword);
    const newUser = new usermodel({
      name,
      password:hashedPassword,
      email,
      phone
    });
    console.log(newUser.password);
    await newUser.save();
    res.status(201).json(newUser); // Status code 201 for successful creation
  } catch (err) {
    console.error('Error adding new employee:', err);
    res.status(500).json({ message: 'Error adding new employee', error: err.message });
  }
});

module.exports = router;
