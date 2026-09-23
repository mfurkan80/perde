import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";

const HomePage = () => {
  return (
    <div>
      <Hero category="popular" />
      <MovieRow title="Popüler Filmler" mediaType="movie" category="popular" />
      <MovieRow
        title="Vizyondakiler"
        mediaType="movie"
        category="now_playing"
      />
      <MovieRow
        title="En Çok Oylananlar"
        mediaType="movie"
        category="top_rated"
      />
      <MovieRow title="Yakında" mediaType="movie" category="upcoming" />
    </div>
  );
};

export default HomePage;
