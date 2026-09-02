import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../api/tmdb";
import { mapMovieSummaryList } from "../api/mappers";
import MovieCard from "../components/MovieCard";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = useState(query);
  const debouncedValue = useDebounce(inputValue, 500);
  useEffect(() => {
    setSearchParams(debouncedValue ? { q: debouncedValue } : {});
  }, [debouncedValue, setSearchParams]);
  const { data, isLoading, error } = useQuery({
    queryKey: ["searchMovies", query],
    queryFn: () => searchMovies(query, 1),
    select: (raw) => mapMovieSummaryList(raw.results),
    enabled: !!query,
  });
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
      {error && <p>{error.message}</p>}
      {data && data.length === 0 && <p>Sonuç bulunamadı...</p>}

      {data && data.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};

export default SearchPage;
