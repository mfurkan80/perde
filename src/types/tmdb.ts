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
  credits: { cast: TmdbCastMember[] };
  videos: { results: TmdbVideo[] };
  similar: { results: TmdbMovie[] };
}

export interface TmdbTvListResponse {
  page: number;
  results: TmdbTvShow[];
  total_pages: number;
  total_results: number;
}

export type MovieCategory =
  "popular" | "now_playing" | "top_rated" | "upcoming";

export interface TmdbCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TmdbVideo {
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  iso_639_1: string;
}

export interface TmdbTvShow {
  id: number;
  name: string;
  overview: string;
  first_air_date: string;
  vote_average: number;
  poster_path: string | null;
  adult: boolean;
  backdrop_path: string | null;
}

export interface TmdbMovieListResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export interface TmdbTvDetail extends TmdbTvShow {
  genres: { id: number; name: string }[];
  episode_run_time: number[];
  number_of_seasons: number;
  number_of_episodes: number;
  tagline: string;
  credits: { cast: TmdbCastMember[] };
  videos: { results: TmdbVideo[] };
  similar: { results: TmdbTvShow[] };
}

export type TvCategory =
  "popular" | "top_rated" | "on_the_air" | "airing_today";
