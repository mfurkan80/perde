import { useQueries, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchFavorites } from "../api/favorites";
import { mapMovieDetail, mapTvDetail } from "../api/mappers";
import { fetchMovieDetail, fetchTvDetail } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";
import type { MovieSummary } from "../types/movie";
import { useAppSelector } from "../store/hooks";

interface FavoriteSectionProps {
  title: string;
  items: MovieSummary[];
}

const FavoriteSection = ({ title, items }: FavoriteSectionProps) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </section>
  );
};

const FavoritesPage = () => {
  const token = useAppSelector((state) => state.auth.token);
  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => fetchFavorites(token!),
    enabled: !!token,
  });

  const mediaQueries = useQueries({
    queries: (favorites ?? []).map((fav) => ({
      queryKey: ["media", fav.mediaType, String(fav.mediaId)],
      queryFn: async () => {
        if (fav.mediaType === "movie") {
          const raw = await fetchMovieDetail(String(fav.mediaId));
          return mapMovieDetail(raw);
        }

        const raw = await fetchTvDetail(String(fav.mediaId));
        return mapTvDetail(raw);
      },
    })),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="text-center mt-12">
        <p className="text-gray-400">Henüz favori içeriğin yok.</p>
        <Link to="/" className="text-white underline mt-2 inline-block">
          Keşfetmeye başla
        </Link>
      </div>
    );
  }

  const items = mediaQueries.map((q) => q.data).filter((m) => m !== undefined);
  const movies = items.filter((item) => item.mediaType === "movie");
  const tvShows = items.filter((item) => item.mediaType === "tv");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Favorilerim</h1>
      <FavoriteSection title="Filmler" items={movies} />
      <FavoriteSection title="Diziler" items={tvShows} />
    </div>
  );
};

export default FavoritesPage;
