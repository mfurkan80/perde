import { useQuery } from "@tanstack/react-query";
import type { MovieCategory } from "../types/tmdb";
import { fetchMoviesByCategory } from "../api/tmdb";
import { mapMovieSummaryList } from "../api/mappers";
import { getBackdropUrl, getReleaseYear } from "../utils/movieHelpers";
import { Link } from "react-router-dom";

interface HeroProps {
  category: MovieCategory;
}

const Hero = ({ category }: HeroProps) => {
  const { data } = useQuery({
    queryKey: ["movies", category],
    queryFn: () => fetchMoviesByCategory(category, 1),
    select: (raw) => mapMovieSummaryList(raw.results),
    staleTime: 5 * 60 * 1000,
  });
  if (!data) {
    return null;
  }
  const movie = data[0];
  if (!movie || !movie.backdropPath) {
    return null;
  }
  return (
    <section className="relative h-125 mb-8 w-screen left-1/2 -translate-x-1/2">
      <img
        src={getBackdropUrl(movie)}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-gray-950 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-5xl font-bold">{movie.title}</h1>
        <div className="flex gap-4 text-sm text-gray-300 mt-2">
          <p>{getReleaseYear(movie)}</p>
          <p>{movie.voteAverage.toFixed(1)}</p>
        </div>
        <p className="max-w-xl mt-4 text-gray-200 line-clamp-3">
          {movie.overview}
        </p>
        <Link
          to={`/movie/${movie.id}`}
          className="inline-block bg-white text-gray-900 px-6 py-2 rounded font-semibold w-fit mt-6"
        >
          Detaya Git
        </Link>
      </div>
    </section>
  );
};

export default Hero;
