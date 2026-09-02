import { Link } from "react-router-dom";
import type { MovieSummary } from "../types/movie";
import { getPosterUrl, getReleaseYear } from "../utils/movieHelpers";
interface MovieCardProps {
  movie: MovieSummary;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div>
      <Link to={`/movie/${movie.id}`}>
        <img src={getPosterUrl(movie)} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>{getReleaseYear(movie)}</p>
        <p>{movie.voteAverage}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
