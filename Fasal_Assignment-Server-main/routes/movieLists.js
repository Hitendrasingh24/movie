// routes/movieLists.js
const express = require('express');
const router = express.Router();
const MovieList = require('../models/MovieList');

// Create a new movie list
router.post('/', async (req, res) => {
  const { userId, name, movies } = req.body;
  try {
    const newMovieList = new MovieList({ userId, name, movies });
    const savedMovieList = await newMovieList.save();
    res.status(201).json(savedMovieList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all movie lists for a user
router.get('/:userId', async (req, res) => {
  try {
    const movieLists = await MovieList.find({ userId: req.params.userId });
    res.json(movieLists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single movie list by ID
router.get('/list/:id', async (req, res) => {
  try {
    const movieList = await MovieList.findById(req.params.id);
    if (!movieList) return res.status(404).json({ message: 'Movie list not found' });
    res.json(movieList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a movie list
router.put('/:id', async (req, res) => {
  try {
    const updatedMovieList = await MovieList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMovieList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a movie list
router.delete('/:id', async (req, res) => {
  try {
    const deletedMovieList = await MovieList.findByIdAndDelete(req.params.id);
    if (!deletedMovieList) return res.status(404).json({ message: 'Movie list not found' });
    res.json({ message: 'Movie list deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
