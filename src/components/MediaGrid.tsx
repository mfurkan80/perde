import type { MovieSummary } from "../types/movie";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

const gridClass =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6";

interface MediaGridProps {
  items: MovieSummary[];
  showMediaType?: boolean;
}

const MediaGrid = ({ items, showMediaType = false }: MediaGridProps) => (
  <div className={gridClass}>
    {items.map((item) => (
      <MovieCard
        key={`${item.mediaType}-${item.id}`}
        movie={item}
        showMediaType={showMediaType}
      />
    ))}
  </div>
);

export const MediaGridSkeleton = ({ count = 12 }: { count?: number }) => (
  <div className={gridClass}>
    {Array.from({ length: count }).map((_, i) => (
      <MovieCardSkeleton key={i} />
    ))}
  </div>
);

export default MediaGrid;
