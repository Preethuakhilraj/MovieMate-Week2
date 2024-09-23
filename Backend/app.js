const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
require('./connection/connection');

const userroute = require('./Routes/userroute');
const adminroute = require('./Routes/adminroute');
const signuproute = require('./Routes/signuproute');
const loginroute = require('./Routes/loginroute');
const bookingroute = require('./Routes/bookingroute');
const paymentroute = require('./Routes/paymentroute');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/user', userroute);
app.use('/booking', bookingroute);
app.use('/admin', adminroute);
app.use('/signup', signuproute);
app.use('/login', loginroute);
app.use('/payment', paymentroute);
app.listen(PORT, (err) => {
  if (err) {
    console.error("Server Connection error!");
  } else {
    console.log(`Server Listening at Port ${PORT}`);
  }
});
