import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { mapMovieSummary, mapTvSummary } from "../api/mappers";
import { fetchMoviesByCategory, fetchTvByCategory } from "../api/tmdb";
import type { MovieCategory, TvCategory } from "../types/tmdb";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

// Ortak alanlar & (film ya da dizi): mediaType'a göre category daralmaya devam ediyor.
type MovieRowProps = { title: string; viewAllTo?: string } & (
  | { mediaType: "movie"; category: MovieCategory }
  | { mediaType: "tv"; category: TvCategory }
);

const MovieRow = ({ title, category, mediaType, viewAllTo }: MovieRowProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["movies", mediaType, category],
    queryFn: async () => {
      if (mediaType === "movie") {
        const raw = await fetchMoviesByCategory(category, 1);
        return raw.results.map(mapMovieSummary);
      }

      const raw = await fetchTvByCategory(category, 1);
      return raw.results.map(mapTvSummary);
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="mb-8">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {viewAllTo && (
          <Link
            to={viewAllTo}
            className="shrink-0 text-sm text-gray-400 transition-colors hover:text-white"
          >
            Tümünü Gör →
          </Link>
        )}
      </div>

      {isLoading && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-32 md:w-40 shrink-0">
              <MovieCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {data && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {data.map((movie) => (
            <div key={movie.id} className="w-32 md:w-40 shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default MovieRow;
