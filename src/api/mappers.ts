import type {
  CastMember,
  MediaPage,
  MovieDetail,
  MovieSummary,
  Video,
} from "../types/movie";
import type { Credit, PersonDetail } from "../types/person";
import type {
  TmdbCastMember,
  TmdbCombinedCredit,
  TmdbListResponse,
  TmdbMovie,
  TmdbMovieDetail,
  TmdbMultiResult,
  TmdbPersonDetail,
  TmdbTvDetail,
  TmdbTvShow,
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
  mediaType: "movie",
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

export const mapMovieDetail = (raw: TmdbMovieDetail): MovieDetail => ({
  ...mapMovieSummary(raw),
  genres: raw.genres,
  runtime: raw.runtime ?? undefined,
  tagline: raw.tagline,
  cast: raw.credits.cast.slice(0, 12).map(mapCastMember),
  videos: raw.videos.results.filter((v) => v.type === "Trailer").map(mapVideo),
  similar: raw.similar.results.map(mapMovieSummary),
});

export const mapTvSummary = (raw: TmdbTvShow): MovieSummary => ({
  id: raw.id,
  title: raw.name,
  releaseDate: raw.first_air_date ?? "",
  voteAverage: raw.vote_average,
  overview: raw.overview,
  adult: raw.adult,
  posterPath: raw.poster_path ?? undefined,
  backdropPath: raw.backdrop_path ?? undefined,
  mediaType: "tv",
});

export const mapTvDetail = (raw: TmdbTvDetail): MovieDetail => ({
  ...mapTvSummary(raw),
  genres: raw.genres,
  runtime: raw.episode_run_time[0] ?? undefined,
  tagline: raw.tagline,
  cast: raw.credits.cast.slice(0, 12).map(mapCastMember),
  videos: raw.videos.results.filter((v) => v.type === "Trailer").map(mapVideo),
  similar: raw.similar.results.map(mapTvSummary),
  seasonCount: raw.number_of_seasons,
  episodeCount: raw.number_of_episodes,
});

export const mapMultiResults = (rawList: TmdbMultiResult[]): MovieSummary[] =>
  rawList
    .filter((raw) => raw.media_type !== "person")
    .map((raw) =>
      raw.media_type === "movie" ? mapMovieSummary(raw) : mapTvSummary(raw),
    );

export const mapListPage = <T>(
  raw: TmdbListResponse<T>,
  mapItems: (items: T[]) => MovieSummary[],
): MediaPage => ({
  items: mapItems(raw.results),
  page: raw.page,
  totalPages: raw.total_pages,
  totalResults: raw.total_results,
});

const creditDate = (raw: TmdbCombinedCredit) =>
  (raw.media_type === "movie" ? raw.release_date : raw.first_air_date) ?? "";

export const mapPersonDetail = (raw: TmdbPersonDetail): PersonDetail => {
  const uniqueCredits = [
    ...new Map(
      raw.combined_credits.cast.map((c) => [`${c.media_type}-${c.id}`, c]),
    ).values(),
  ];

  const knownFor = [...uniqueCredits]
    .filter((c) => c.poster_path)
    .sort((a, b) => b.vote_count - a.vote_count)
    .slice(0, 12)
    .map((c) =>
      c.media_type === "movie" ? mapMovieSummary(c) : mapTvSummary(c),
    );

  const credits: Credit[] = uniqueCredits
    .map((c) => ({
      id: c.id,
      mediaType: c.media_type,
      title: c.media_type === "movie" ? c.title : c.name,
      date: creditDate(c),
      character: c.character,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));

  return {
    id: raw.id,
    name: raw.name,
    biography: raw.biography,
    birthday: raw.birthday,
    deathday: raw.deathday,
    placeOfBirth: raw.place_of_birth,
    profilePath: raw.profile_path ?? undefined,
    department: raw.known_for_department,
    knownFor,
    credits,
  };
};
