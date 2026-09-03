export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string | null;
  adult: boolean;
  backdrop_path: string | null;
}

export interface TmdbMovieDetail extends TmdbMovie {
  genres: { id: number; name: string }[];
  runtime: number | null;
  tagline: string;
}

export interface TmdbMovieListResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export type MovieCategory =
  | "popular"
  | "now_playing"
  | "top_rated"
  | "upcoming";
