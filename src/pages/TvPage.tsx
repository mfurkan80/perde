import MovieRow from "../components/MovieRow";

const TvPage = () => {
  return (
    <div>
      <MovieRow title="Popüler Diziler" mediaType="tv" category="popular" />
      <MovieRow title="En Çok Oylananlar" mediaType="tv" category="top_rated" />
      <MovieRow title="Yayında Olanlar" mediaType="tv" category="on_the_air" />
      <MovieRow
        title="Bugün Yayınlananlar"
        mediaType="tv"
        category="airing_today"
      />
    </div>
  );
};

export default TvPage;
