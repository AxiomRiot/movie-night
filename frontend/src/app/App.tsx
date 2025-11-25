import type { FilterType } from '../types/movieTypes';

import { useState } from 'react';
import FilterWindow from '../components/FilterWindow';
import { Theme } from '../components/Theme';
import TopBar from '../components/TopBar';
import { selectMovie } from '../services/movieService';

function tmdbImageUrl(path?: string | null, size = 'w342') {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

function App() {
  const [filterWindowOpen, setFilterWindowOpen] = useState(false);
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFilterWindowOpen() {
    setFilterWindowOpen(prev => !prev);
  }

  async function handlePickAMovie() {
    setLoading(true);
    setError(null);

    const filter: FilterType = {
      watchListOnly: true,
      language: 'en-US',
    };

    try {
      const movieData = await selectMovie(filter);
      setMovie(movieData);
    } catch (err) {
      setError(String(err));
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Theme>
      <TopBar
        handleFilterWindowOpen={handleFilterWindowOpen}
        handlePickMovie={handlePickAMovie}
      />
      {filterWindowOpen && <FilterWindow />}

      <main style={{ padding: 16 }}>
        {loading && <div>Loading…</div>}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}

        {!loading && !movie && (
          <div>
            <p>No movie selected.</p>
            <button onClick={handlePickAMovie}>Pick a movie</button>
          </div>
        )}

        {movie && (
          <article>
            <header>
              <h2>{movie.title ?? movie.original_title}</h2>
              <p>{movie.release_date ? `Released: ${movie.release_date}` : null}</p>
              <p>Rating: {movie.vote_average ?? 'N/A'}</p>
            </header>

            {tmdbImageUrl(movie.backdrop_path, 'w780') && (
              <img
                src={tmdbImageUrl(movie.backdrop_path, 'w780')!}
                alt={`${movie.title} backdrop`}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            )}

            <section style={{ display: 'flex', gap: 12, marginTop: 12 }}>
              {tmdbImageUrl(movie.poster_path, 'w342') && (
                <img
                  src={tmdbImageUrl(movie.poster_path, 'w342')!}
                  alt={`${movie.title} poster`}
                  style={{ width: 150, height: 'auto' }}
                />
              )}

              <div>
                <p>{movie.overview}</p>
                <div style={{ marginTop: 12 }}>
                  <button onClick={handlePickAMovie}>Pick another</button>
                  {movie.id && (
                    <a
                      href={`https://www.themoviedb.org/movie/${movie.id}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ marginLeft: 12 }}
                    >
                      View on TMDB
                    </a>
                  )}
                </div>
              </div>
            </section>
          </article>
        )}
      </main>
    </Theme>
  );
}

export default App;
