import { Link } from "react-router-dom";
import type { MovieSummary } from "../types/movie";
import { getPosterUrl, getReleaseYear } from "../utils/movieHelpers";
interface MovieCardProps {
  movie: MovieSummary;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="rounded-lg overflow-hidden hover:scale-105 transition">
      <Link className="block" to={`/movie/${movie.id}`}>
        <img
          className="w-full h-48 md:h-72 object-cover"
          src={getPosterUrl(movie)}
          alt={movie.title}
          loading="lazy"
        />
        <div className="p-3">
          <h2 className="text-sm font-semibold line-clamp-2 min-h-10 mb-1">
            {movie.title}
          </h2>
          <div className="flex justify-between text-xs text-gray-500">
            <p>{getReleaseYear(movie)}</p>
            <p>{movie.voteAverage.toFixed(1)}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
