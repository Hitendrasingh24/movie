// models/MovieList.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  imdbID: { type: String, required: true },
  Poster: { type: String, required: true },
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  Genre: { type: String, required: true },
  Director: { type: String, required: true },
  Plot: { type: String, required: true },
  type: { type: String, enum: ['public', 'unlisted'], default: 'public' }
});

const movieListSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  movies: [movieSchema]
});

module.exports = mongoose.model('MovieList', movieListSchema);
