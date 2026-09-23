import { useQuery } from "@tanstack/react-query";
import { mapMovieSummary, mapTvSummary } from "../api/mappers";
import { fetchMoviesByCategory, fetchTvByCategory } from "../api/tmdb";
import type { MovieCategory, TvCategory } from "../types/tmdb";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

type MovieRowProps =
  | { title: string; mediaType: "movie"; category: MovieCategory }
  | { title: string; mediaType: "tv"; category: TvCategory };

const MovieRow = ({ title, category, mediaType }: MovieRowProps) => {
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
    <div>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
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
    </div>
  );
};

export default MovieRow;
