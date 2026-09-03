import type { MovieDetail, MovieSummary } from "../types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

export const getPosterUrl = (movie: MovieSummary): string => {
  if (!movie.posterPath) {
    return "/placeholder.jpg";
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
