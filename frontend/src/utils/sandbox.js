const API_ACCESS_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhOTMyNWY2NzlhMGVlYjQ3M2ZjYTJhZDM1ZmVkMjdlNCIsIm5iZiI6MTc1ODc2MTY2My4zNTIsInN1YiI6IjY4ZDQ5MmJmODM4N2FkYzZjOTkxMzkxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z-aSlS1E83jzYdGMnJQptk1KUqkj3Uyg5_cUHTJMrLA';

async function fetchData() {
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Authorization': `Bearer ${API_ACCESS_KEY}`,
    },
  };

  // const url = `https://api.themoviedb.org/3/account`;
  // const url = 'https://api.themoviedb.org/3/search/movie?query=Aliens&include_adult=false&language=en-US&page=1';
  const url = 'https://api.themoviedb.org/3/movie/679?language=en-US';

  const response = await fetch(url, options);
  const data = await response.json();

  console.warn(data);
}

async function postData() {
  const url = 'https://api.themoviedb.org/3/account/22335753/watchlist';
  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'Authorization': `Bearer ${API_ACCESS_KEY}`,
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: 679,
      watchlist: true,
    }),
  };

  const response = await fetch(url, options);
  const data = await response.json();

  console.warn(data);
}

postData();
