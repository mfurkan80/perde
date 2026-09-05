import type {
  CastMember,
  MovieDetail,
  MovieSummary,
  Video,
} from "../types/movie";
import type {
  TmdbCastMember,
  TmdbMovie,
  TmdbMovieDetail,
  TmdbVideo,
} from "../types/tmdb";

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

export const mapCastMember = (raw: TmdbCastMember): CastMember => ({
  id: raw.id,
  name: raw.name,
  character: raw.character,
  profilePath: raw.profile_path ?? undefined,
});

export const mapVideo = (raw: TmdbVideo): Video => ({
  key: raw.key,
  name: raw.name,
  type: raw.type,
  language: raw.iso_639_1,
});

export const mapMovieSummaryList = (rawList: TmdbMovie[]): MovieSummary[] =>
  rawList.map(mapMovieSummary);

export const mapMovieDetail = (raw: TmdbMovieDetail): MovieDetail => ({
  ...mapMovieSummary(raw),
  genres: raw.genres,
  runtime: raw.runtime ?? undefined,
  tagline: raw.tagline,
  cast: raw.credits.cast.slice(0, 12).map(mapCastMember),
  videos: raw.videos.results.filter((v) => v.type === "Trailer").map(mapVideo),
  similar: mapMovieSummaryList(raw.similar.results),
});
