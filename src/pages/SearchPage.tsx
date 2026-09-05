import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/tmdb";
import { mapMovieSummaryList } from "../api/mappers";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? 1);

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["searchMovies", query, page],
    queryFn: () => searchMovies(query, page),
    select: (raw) => ({
      movies: mapMovieSummaryList(raw.results),
      totalPages: raw.total_pages,
    }),
    enabled: !!query,
    placeholderData: keepPreviousData,
  });

  const totalPages = data ? Math.min(data.totalPages, 500) : 1;

  return (
    <div>
      {query && (
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          "{query}" için sonuçlar
        </h1>
      )}

      {!query && (
        <p className="text-gray-400">Aramak için yukarıdaki kutuyu kullanın.</p>
      )}
      {isLoading && <p className="text-gray-400">Aranıyor...</p>}
      {isFetching && !isLoading && (
        <p className="text-gray-400 mb-4">Yükleniyor...</p>
      )}
      {error && <p className="text-gray-400">{error.message}</p>}
      {data && data.movies.length === 0 && (
        <p className="text-gray-400">Sonuç bulunamadı.</p>
      )}

      {data && data.movies.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() =>
                setSearchParams({ q: query, page: String(page - 1) })
              }
              className="px-4 py-2 bg-gray-800 rounded text-sm disabled:opacity-40"
            >
              Önceki
            </button>
            <span className="text-sm text-gray-400">
              {page} / {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() =>
                setSearchParams({ q: query, page: String(page + 1) })
              }
              className="px-4 py-2 bg-gray-800 rounded text-sm disabled:opacity-40"
            >
              Sonraki
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
