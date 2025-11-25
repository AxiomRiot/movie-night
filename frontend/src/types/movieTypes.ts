export interface FilterType {
  watchListOnly: boolean;
  language: string;
};

export interface MovieType {
  title: string;
  overview: string;
  runtime: number;
  tagline: string;
  posterPath: string;
  backdropPath: string;
}
