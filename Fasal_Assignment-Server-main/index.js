// index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const movieLists = require('./routes/movieLists');
const cors = require('cors'); // Add this line

const app = express();
app.use(cors()); // And this line
app.use(bodyParser.json());

// Replace with your MongoDB Atlas connection string
const dbURI = 'mongodb+srv://hitendrasingh511:movie@movie.xuowfvo.mongodb.net/?retryWrites=true&w=majority&appName=movie';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

app.use('/api/movieLists', movieLists);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});