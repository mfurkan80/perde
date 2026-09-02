import { useQuery } from "@tanstack/react-query";
import MovieCard from "../components/MovieCard";
import { fetchPopularMovies } from "../api/tmdb";
import { mapMovieSummaryList } from "../api/mappers";

const HomePage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovies,
    staleTime: 5 * 60 * 1000,
    select: (raw) => mapMovieSummaryList(raw.results),
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

  return (
    <div>
      {data.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default HomePage;
