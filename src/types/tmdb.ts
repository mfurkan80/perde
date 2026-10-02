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

export interface TmdbListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type TmdbMovieListResponse = TmdbListResponse<TmdbMovie>;
export type TmdbTvListResponse = TmdbListResponse<TmdbTvShow>;

export interface TmdbGenreListResponse {
  genres: { id: number; name: string }[];
}

export interface TmdbPerson {
  id: number;
  name: string;
  profile_path: string | null;
}

export type TmdbMultiResult =
  | (TmdbMovie & { media_type: "movie" })
  | (TmdbTvShow & { media_type: "tv" })
  | (TmdbPerson & { media_type: "person" });

export type TmdbMultiListResponse = TmdbListResponse<TmdbMultiResult>;

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

export type TmdbCombinedCredit =
  | (TmdbMovie & {
      media_type: "movie";
      character: string;
      vote_count: number;
    })
  | (TmdbTvShow & { media_type: "tv"; character: string; vote_count: number });

export interface TmdbPersonDetail {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  combined_credits: { cast: TmdbCombinedCredit[] };
}
