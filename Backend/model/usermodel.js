const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true }
});

const usermodel = mongoose.model('user', userSchema);

module.exports = usermodel;
