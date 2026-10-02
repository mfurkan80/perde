import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";

const HomePage = () => {
  return (
    <div>
      <Hero category="popular" />

      <MovieRow
        title="Popüler Filmler"
        mediaType="movie"
        category="popular"
        viewAllTo="/movie"
      />
      <MovieRow
        title="Popüler Diziler"
        mediaType="tv"
        category="popular"
        viewAllTo="/tv"
      />

      <MovieRow
        title="Vizyondaki Filmler"
        mediaType="movie"
        category="now_playing"
      />
      <MovieRow
        title="Yayındaki Diziler"
        mediaType="tv"
        category="on_the_air"
      />

      <MovieRow
        title="En Çok Oylanan Filmler"
        mediaType="movie"
        category="top_rated"
        viewAllTo="/movie?sort=top_rated"
      />
      <MovieRow
        title="En Çok Oylanan Diziler"
        mediaType="tv"
        category="top_rated"
        viewAllTo="/tv?sort=top_rated"
      />

      <MovieRow
        title="Yakında Vizyonda"
        mediaType="movie"
        category="upcoming"
      />
      <MovieRow title="Bugün Yayında" mediaType="tv" category="airing_today" />
    </div>
  );
};

export default HomePage;
