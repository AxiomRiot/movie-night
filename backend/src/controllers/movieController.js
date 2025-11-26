const { getMovie } = require('../services/movieService');
const logger = require('../utils/loggers');

const getRandomMovieController = async (req, res) => {
  logger.info('Received a get random movie request');

  try {
    const movie = await getMovie();

    res.status(201).send(movie);
  } catch (error) {
    logger.error(`Error get movie: ${error.message}`);
    res.status(500).send(`Error get movie: ${error.message}`);
  }
}

module.exports = {
  getRandomMovieController
}