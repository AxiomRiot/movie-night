import React, { useEffect, useState } from 'react';
import type { FilterType } from '../../types/movieTypes';
import { selectMovie } from '../../services/movieService';

const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';

function tmdbImageUrl(path?: string | null, size = 'w780') {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}${size}${path}`;
}

type Props = {
  filters: FilterType;
  autoFetch?: boolean;
};

export default function Movie({ filters, autoFetch = true }: Props) {
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchRandomMovie() {
    setLoading(true);
    setError(null);

    try {
      const picked = await selectMovie(filters);
      setMovie(picked ?? null);
    } catch (err) {
      setError(String(err));
      setMovie(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (autoFetch) fetchRandomMovie();
    // re-run when filters change
  }, [filters, autoFetch]);

  if (loading) return <div>Loading…</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return (
    <div>
      <p>No movie found.</p>
      <button onClick={fetchRandomMovie}>Try again</button>
    </div>
  );

  const poster = tmdbImageUrl(movie.poster_path, 'w342');
  const backdrop = tmdbImageUrl(movie.backdrop_path, 'w780');

  return (
    <article>
      <header>
        <h2>{movie.title ?? movie.original_title}</h2>
        <p>{movie.release_date ? `Released: ${movie.release_date}` : null}</p>
        <p>Rating: {movie.vote_average ?? 'N/A'}</p>
      </header>

      {backdrop && <img src={backdrop} alt={`${movie.title} backdrop`} style={{ maxWidth: '100%', height: 'auto' }} />}
      <section>
        {poster && <img src={poster} alt={`${movie.title} poster`} style={{ width: 150, float: 'left', marginRight: 12 }} />}
        <p>{movie.overview}</p>
      </section>

      <footer style={{ clear: 'both', marginTop: 12 }}>
        <button onClick={fetchRandomMovie}>Pick another</button>
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
      </footer>
    </article>
  );
}