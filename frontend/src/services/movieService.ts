import type { FilterType } from '../types/movieTypes';
import { MovieApi } from '../api/movieApi';
import { mapResponseToMovieType } from '../utils/movieMapper';

const BASE_URL = 'https://api.themoviedb.org/3';
const ACCOUNT_ID = '22335753';

const movieAPI = new MovieApi();

function buildMovieUrl(
  filters: FilterType,
) {
  if (filters.watchListOnly) {
    return new URL(
      `/account/${ACCOUNT_ID}/watchlist/movies`,
      BASE_URL,
    ).toString();
  }

  const url = new URL(
    '/discover/movie',
    BASE_URL,
  );

  // common params
  url.searchParams.set('language', filters.language ?? 'en-US');
  // if (filters.page) url.searchParams.set('page', String(filters.page));
  // if (filters.pageSize) url.searchParams.set('page_size', String(filters.pageSize));
  // if (filters.sortBy) url.searchParams.set('sort_by', filters.sortBy);
  url.searchParams.set('include_adult', String(true));

  // add any other filter mappings here
  return url.toString();
}

function getRandomInt(maxExclusive: number) {
  return Math.floor((Math.random() * maxExclusive));
}

export async function selectMovie(filters: FilterType) {
  const url: string = buildMovieUrl(filters);

  const firstPage = await movieAPI.getMovie(url);
  const totalPages: number = firstPage.total_pages;

  const pageData = totalPages === 1
    ? firstPage
    : await movieAPI.getMovie(
        (() => {
          const u = new URL(url);
          u.searchParams.set('page', String(getRandomInt(totalPages) + 1));
          return u.toString();
        })(),
      );

  const totalNumberOfMovies: number = pageData.results.length;

  if (totalNumberOfMovies === 0) {
    return undefined;
  }

  const selectedMovieId = pageData.results[getRandomInt(totalNumberOfMovies)].id;

  const selectedMovie = await movieAPI.getMovie(
    (() => {
      const u = new URL(
        `/movie/${selectedMovieId}`,
        BASE_URL,
      );
      return u.toString();
    })(),
  );

  return mapResponseToMovieType(selectedMovie);
}
