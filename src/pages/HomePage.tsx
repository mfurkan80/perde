import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";

const HomePage = () => {
  return (
    <div>
      <Hero category="popular" />
      <MovieRow title="Popüler Filmler" category="popular" />
      <MovieRow title="Vizyondakiler" category="now_playing" />
      <MovieRow title="En Çok Oylananlar" category="top_rated" />
      <MovieRow title="Yakında" category="upcoming" />
    </div>
  );
};

export default HomePage;
