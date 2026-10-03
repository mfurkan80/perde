import type { MovieDetail, MovieSummary, Video } from "../types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";
const PROFILE_BASE_URL = "https://image.tmdb.org/t/p/w185";

export const getPosterUrl = (movie: MovieSummary): string | null => {
  if (!movie.posterPath) {
    return null;
  }

  return `${IMAGE_BASE_URL}${movie.posterPath}`;
};

export const getReleaseYear = (movie: MovieSummary): string =>
  movie.releaseDate.split("-")[0];

export const getGenreNames = (movie: MovieDetail): string => {
  return movie.genres.map((genre) => genre.name).join(", ");
};

export const logMovie = (movie: MovieSummary): void => {
  console.log(`${movie.title} (${getReleaseYear(movie)})`);
};

export const getBackdropUrl = (movie: MovieSummary): string => {
  if (!movie.backdropPath) {
    return "";
  }

  return `${BACKDROP_BASE_URL}${movie.backdropPath}`;
};

export const getBestTrailer = (videos: Video[]): Video | undefined => {
  const fragman = videos.find(
    (v) => v.language === "tr" && v.name.includes("Dublaj"),
  );
  if (fragman) {
    return fragman;
  }

  const anyFragman = videos.find((v) => v.language === "tr");

  if (anyFragman) {
    return anyFragman;
  }

  return videos[0];
};

export const getProfileUrl = (profile: {
  profilePath?: string;
}): string | null => {
  if (!profile.profilePath) {
    return null;
  }
  return `${PROFILE_BASE_URL}${profile.profilePath}`;
};
