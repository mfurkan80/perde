export interface MovieSummary {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  posterPath?: string;
  adult: boolean;
  backdropPath?: string;
}

export interface MovieDetail extends MovieSummary {
  genres: Genre[];
  runtime?: number;
  tagline?: string;
}

export interface Genre {
  id: number;
  name: string;
}
