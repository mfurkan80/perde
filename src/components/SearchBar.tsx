import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mapMovieSummaryList } from "../api/mappers";
import { searchMovies } from "../api/tmdb";
import { useDebounce } from "../hooks/useDebounce";
import { getPosterUrl, getReleaseYear } from "../utils/movieHelpers";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 300);
  const { data } = useQuery({
    queryKey: ["searchBar", debouncedValue],
    queryFn: () => searchMovies(debouncedValue, 1),
    select: (raw) => mapMovieSummaryList(raw.results).slice(0, 6),
    enabled: !!debouncedValue,
  });
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    navigate(`/search?q=${encodeURIComponent(inputValue)}`);
    setIsOpen(false);
  };
  return (
    <div
      ref={containerRef}
      className="relative w-full md:flex-1 md:max-w-md md:mx-8"
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Film Ara..."
          className="w-full px-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
      </form>
      {isOpen && data && data.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 rounded shadow-lg z-50 overflow-hidden">
          {data.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              onClick={() => setIsOpen(false)}
              className="flex gap-3 p-2 hover:bg-gray-700"
            >
              <img
                src={getPosterUrl(movie)}
                alt={movie.title}
                className="w-10 h-14 object-cover rounded"
              />
              <div>
                <h2 className="text-sm text-white">{movie.title}</h2>
                <p className="text-xs text-gray-400">{getReleaseYear(movie)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
