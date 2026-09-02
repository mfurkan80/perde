import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../api/tmdb";
import { mapMovieDetail } from "../api/mappers";
import {
  getGenreNames,
  getPosterUrl,
  getReleaseYear,
} from "../utils/movieHelpers";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Film bulunamadı :/");
      }
      return fetchMovieDetail(id);
    },
    select: mapMovieDetail,
    enabled: !!id,
  });
  if (!id) {
    return <p>Film bulunamadı :/</p>;
  }
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
      <img src={getPosterUrl(data)} alt={data.title} />
      <h1>{data.title}</h1>
      {data.tagline && <p>{data.tagline}</p>}
      <p>{getReleaseYear(data)}</p>
      <p>{getGenreNames(data)}</p>
      {data.runtime && <p>{data.runtime} dakika</p>}
      <p>{data.voteAverage.toFixed(1)}</p>
      <p>{data.overview}</p>
    </div>
  );
};

export default MovieDetailPage;
