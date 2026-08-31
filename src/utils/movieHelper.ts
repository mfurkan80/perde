import type { Movie } from "../types/movie";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const getPosterUrl = (movie: Movie): string => {
  if (!movie.posterPath) {
    return "/placeholder.jpg";
  }

  return `${IMAGE_BASE_URL}${movie.posterPath}`;
};

export const getReleaseYear = (movie: Movie): string =>
  movie.releaseDate.split("-")[0];

export const getGenreNames = (movie: Movie): string => {
  return movie.genres.map((genre) => genre.name).join(", ");
};

export const logMovie = (movie: Movie): void => {
  console.log(`${movie.title} (${getReleaseYear(movie)})`);
};
