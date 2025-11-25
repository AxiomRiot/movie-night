import type { MovieType } from '../types/movieTypes';

export function mapResponseToMovieType(data: any): MovieType {
  return {
    title: data.title,
    overview: data.overiew,
    runtime: data.runtime,
    tagline: data.tagline,
    posterPath: data.poster_path,
    backdropPath: data.backdrop_path,
  };
}
