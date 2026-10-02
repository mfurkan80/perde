import { Link } from "react-router-dom";
import type { MovieSummary } from "../types/movie";
import { getPosterUrl, getReleaseYear } from "../utils/movieHelpers";

interface MovieCardProps {
  movie: MovieSummary;
  showMediaType?: boolean;
}

const MovieCard = ({ movie, showMediaType = false }: MovieCardProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden hover:scale-105 transition">
      <Link className="block" to={`/${movie.mediaType}/${movie.id}`}>
        {showMediaType && (
          <span className="absolute left-2 top-2 rounded bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
            {movie.mediaType === "movie" ? "Film" : "Dizi"}
          </span>
        )}
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
