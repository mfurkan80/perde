import type { MovieDetail, MovieSummary } from "../types/movie";
import type { TmdbMovie, TmdbMovieDetail } from "../types/tmdb";

export const mapMovieSummary = (raw: TmdbMovie): MovieSummary => ({
  id: raw.id,
  title: raw.title,
  releaseDate: raw.release_date,
  voteAverage: raw.vote_average,
  overview: raw.overview,
  adult: raw.adult,
  posterPath: raw.poster_path ?? undefined,
  backdropPath: raw.backdrop_path ?? undefined,
});

export const mapMovieSummaryList = (rawList: TmdbMovie[]): MovieSummary[] =>
  rawList.map(mapMovieSummary);

export const mapMovieDetail = (raw: TmdbMovieDetail): MovieDetail => ({
  ...mapMovieSummary(raw),
  genres: raw.genres,
  runtime: raw.runtime ?? undefined,
  tagline: raw.tagline,
});
