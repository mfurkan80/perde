import { useQuery } from "@tanstack/react-query";
import { mapMovieSummary, mapTvSummary } from "../api/mappers";
import { fetchMoviesByCategory, fetchTvByCategory } from "../api/tmdb";
import type { MovieCategory, TvCategory } from "../types/tmdb";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import ScrollRow from "./ScrollRow";

type MovieRowProps = { title: string } & (
  | { mediaType: "movie"; category: MovieCategory }
  | { mediaType: "tv"; category: TvCategory }
);

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
    <section className="mb-8">
      <h2 className="mb-1 text-xl font-semibold">{title}</h2>

      {isLoading && (
        <div className="-mx-2 flex gap-4 scrollbar-none overflow-x-auto overflow-y-hidden px-2 pt-3 pb-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-32 md:w-40 shrink-0">
              <MovieCardSkeleton />
            </div>
          ))}
        </div>
      )}

      {data && (
        <ScrollRow
          wrapperClassName="-mx-2"
          className="flex gap-4 px-2 pt-3 pb-4"
        >
          {data.map((movie) => (
            <div key={movie.id} className="w-32 md:w-40 shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </ScrollRow>
      )}
    </section>
  );
};

export default MovieRow;
