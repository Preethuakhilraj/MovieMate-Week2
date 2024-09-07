const mongoose = require('mongoose');
require('dotenv').config();

const db=mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://preethu:preethu@cluster0.eksdofl.mongodb.net/moviemate?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
  console.log("DB is connected");
})
.catch((error) => {
  console.error('Error in connection', error);
});

module.exports = db;