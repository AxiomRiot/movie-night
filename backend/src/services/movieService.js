const { sendGETRequest } = require('../api/movieApi');
const logger = require('../utils/loggers');

const BASE_URL = 'https://api.themoviedb.org/';
const ACCOUNT_ID = process.env.ACCOUNT_ID;
  ``
function buildMovieUrl() {
  const url = new URL(
    `3/account/${ACCOUNT_ID}/watchlist/movies`,
    BASE_URL,
  ).toString();

  // common params
  // url.searchParams.set('language', 'en-US');
  // if (filters.page) url.searchParams.set('page', String(filters.page));
  // if (filters.pageSize) url.searchParams.set('page_size', String(filters.pageSize));
  // if (filters.sortBy) url.searchParams.set('sort_by', filters.sortBy);
  // url.searchParams.set('include_adult', String(true));

  // add any other filter mappings here
  return url.toString();
}

function getRandomInt(maxExclusive) {
  return Math.floor((Math.random() * maxExclusive));
}

const getMovie = async () => {
  try {
    const url = `https://api.themoviedb.org/3/account/22335753/watchlist/movies`;
    const firstPage = await sendGETRequest(url);

    const totalPages = firstPage.total_pages;

    const pageData = totalPages === 1
    ? firstPage
    : await sendGETRequest(
        (() => {
          const u = new URL(url);
          u.searchParams.set('page', String(getRandomInt(totalPages) + 1));
          return u.toString();
        })(),
      );

    const totalNumberOfMovies = pageData.results.length;

    if (totalNumberOfMovies === 0) {
      throw new Error('Failed to get movies from TMDB');
    }

    const selectedMovieId = pageData.results[getRandomInt(totalNumberOfMovies)].id;

    const selectedMovie = await sendGETRequest(
      (() => {
        const u = new URL(
          `/3/movie/${selectedMovieId}`,
          BASE_URL,
        );
        return u.toString();
      })(),
    );

    logger.info(`Movie that was selected: ${selectedMovie.title}`);

    return selectedMovie;

  } catch (error) {
    logger.error(`Error creating recipe: ${error.message}`);
    throw error;
  }
}

module.exports = {
  getMovie
}