const Movie = require('../models/movieModel');
const logger = require('../utils/loggers');

const createMovie = async (movieToAdd) => {
  try {
    const movie = new Movie(movieToAdd);
    await movie.save();

    return movie;
  } catch (error) {
    logger.error(`Error creating movie: ${error.message}`);
    throw error;
  }
}

const readMovies = async (genre) => {
  try {
    logger.info(`Getting all movies with genre: ${genre}`);
    const movieArray = await Movie.find({ genre: `${genre}` });

    return movieArray;
  } catch (error) {
    logger.error(`Error reading movie: ${error.message}`);
    throw error;
  }
}

module.exports = {
  createMovie,
  readMovies
}