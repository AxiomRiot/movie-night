import { readFile } from 'node:fs/promises';
import promptSync from 'prompt-sync';

const prompt = promptSync({ sigint: true });
const API_ACCESS_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTMyNWY2NzlhMGVlYjQ3M2ZjYTJhZDM1ZmVkMjdlNCIsIm5iZiI6MTc1ODc2MTY2My4zNTIsInN1YiI6IjY4ZDQ5MmJmODM4N2FkYzZjOTkxMzkxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z-aSlS1E83jzYdGMnJQptk1KUqkj3Uyg5_cUHTJMrLA';

async function fetchData(url) {
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${API_ACCESS_KEY}`,
    },
  };

  const response = await fetch(url, options);
  return await response.json();
}

async function searchForMovie(movie) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&include_adult=true&language=en-US&page=1`;
  return await fetchData(url);
}

async function getWatchlist() {
  const url = 'https://api.themoviedb.org/3/account/22335753/watchlist/movies';
  const data = await fetchData(url);
  return (data.results || []).map((m) => m.title);
}

async function addMovieToWatchlist(movieTitle, movieId) {
  const url = 'https://api.themoviedb.org/3/account/22335753/watchlist';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: `Bearer ${API_ACCESS_KEY}`,
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: movieId,
      watchlist: true,
    }),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (data.status_code === 1) {
    console.warn(`Successfully added ${movieTitle} to watch list`);
  } else {
    console.error(`Failed to add ${movieTitle} to watchlist: ${data.status_message}`);
  }
}

async function main() {
  try {
    const watchList = await getWatchlist();
    console.warn(watchList);
    
    // use promise-based readFile
    const csv = await readFile('movie-list.csv', 'utf8');
    const rows = csv.split('\n');
    const movieList = [];

    for (let i = 0; i < rows.length; i++) {
      const values = rows[i].split(',');
      movieList.push(values[0]);
    }

    for (let i = 0; i < movieList.length; i++) {
      const movieTitle = movieList[i];

      if (!watchList.includes(movieTitle)) {
        console.warn('---------------------------------------------');
        const data = await searchForMovie(movieTitle);
        data.results.forEach((movie, index) => {
          const selectionLine = `${index}. ${movie.original_title}: ${movie.overview}`;
          console.warn(selectionLine);
        });
        const userInput = prompt('Please select a movie to add to wishlist: ', '0');
        const selectedMovie = data.results[Number(userInput)];
        await addMovieToWatchlist(selectedMovie.title, selectedMovie.id, watchList);
      }
      else {
        console.warn(`${movieTitle} already exists in watchlist!`);
      }
    }
  }
  catch (err) {
    console.error('Error in main:', err);
  }
}

main();
