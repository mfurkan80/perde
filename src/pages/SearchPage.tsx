import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/tmdb";
import { mapMovieSummaryList } from "../api/mappers";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(query);
  const debouncedValue = useDebounce(inputValue, 500);
  const page = Number(searchParams.get("page") ?? 1);
  useEffect(() => {
    if (debouncedValue === query) {
      return;
    }
    setSearchParams(debouncedValue ? { q: debouncedValue } : {});
  }, [debouncedValue]);
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
      <h1>Search</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Film ara..."
      />
      {!query && <p>Aramak için bir şey yazın.</p>}
      {isLoading && <p>Aranıyor...</p>}
      {isFetching && !isLoading && <p>Yükleniyor...</p>}
      {error && <p>{error.message}</p>}
      {data && data.movies.length === 0 && <p>Sonuç bulunamadı...</p>}

      {data &&
        data.movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      {data && (
        <div>
          <button
            disabled={page === 1}
            onClick={() =>
              setSearchParams({ q: query, page: String(page - 1) })
            }
          >
            Önceki
          </button>
          <span>
            Sayfa {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() =>
              setSearchParams({ q: query, page: String(page + 1) })
            }
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
