import { useQuery } from "@tanstack/react-query";
import { mapMovieSummaryList } from "../api/mappers";
import { fetchMoviesByCategory } from "../api/tmdb";
import type { MovieCategory } from "../types/tmdb";
import MovieCard from "./MovieCard";
import Spinner from "./Spinner";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface MovieRowProps {
  title: string;
  category: MovieCategory;
}

const MovieRow = ({ title, category }: MovieRowProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["movies", category],
    queryFn: () => fetchMoviesByCategory(category, 1),
    select: (raw) => mapMovieSummaryList(raw.results),
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
