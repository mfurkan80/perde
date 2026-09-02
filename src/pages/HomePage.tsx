import { keepPreviousData, useQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
import { fetchPopularMovies } from "../api/tmdb";
import { mapMovieSummaryList } from "../api/mappers";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["popularMovies", page],
    queryFn: () => fetchPopularMovies(page),
    staleTime: 5 * 60 * 1000,
    select: (raw) => ({
      movies: mapMovieSummaryList(raw.results),
      totalPages: raw.total_pages,
    }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <p>Yükleniyor...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if (!data) {
    return <p>Film bulunamadı :/</p>;
  }
  const totalPages = Math.min(data.totalPages, 500);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      {isFetching && <p>Yükleniyor...</p>}
      {data.movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      <div>
        <button
          disabled={page === 1}
          onClick={() => setSearchParams({ page: String(page - 1) })}
        >
          Önceki
        </button>
        <span>
          Sayfa {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setSearchParams({ page: String(page + 1) })}
        >
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default HomePage;
