import { useQueries, useQuery } from "@tanstack/react-query";
import { useAppSelector } from "../store/hooks";
import { fetchFavorites } from "../api/favorites";
import { fetchMovieDetail } from "../api/tmdb";
import { mapMovieDetail } from "../api/mappers";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
  const token = useAppSelector((state) => state.auth.token);
  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => fetchFavorites(token!),
    enabled: !!token,
  });

  const movieQueries = useQueries({
    queries: (favorites ?? []).map((id) => ({
      queryKey: ["movie", String(id)],
      queryFn: () => fetchMovieDetail(String(id)),
      select: mapMovieDetail,
    })),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center mt-12">
        <p className="text-gray-400">Henüz favori filmin yok.</p>
        <Link to="/" className="text-white underline mt-2 inline-block">
          Film keşfetmeye başla
        </Link>
      </div>
    );
  }

  const movies = movieQueries.map((q) => q.data).filter((m) => m !== undefined);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Favorilerim</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
