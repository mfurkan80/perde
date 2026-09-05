import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../api/tmdb";
import { mapMovieDetail } from "../api/mappers";
import {
  getBackdropUrl,
  getBestTrailer,
  getGenreNames,
  getPosterUrl,
  getReleaseYear,
} from "../utils/movieHelpers";
import CastRow from "../components/CastRow";

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
  const trailer = getBestTrailer(data.videos);
  return (
    <div>
      <section className="relative w-screen left-1/2 -translate-x-1/2 mb-8 -mt-6">
        {data.backdropPath && (
          <img
            src={getBackdropUrl(data)}
            alt={data.title}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-r from-gray-950 via-gray-950/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-gray-950 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 flex gap-8">
          <img
            src={getPosterUrl(data)}
            alt={data.title}
            className="w-64 rounded-lg shrink-0"
          />
          <div>
            <h1 className="text-4xl font-bold">{data.title}</h1>
            {data.tagline && (
              <p className="text-gray-400 italic mt-1">{data.tagline}</p>
            )}
            <div className="flex gap-4 text-sm text-gray-300 mt-4">
              <p>{getReleaseYear(data)}</p>
              {data.runtime && <p>{data.runtime} dakika</p>}
              <p>★{data.voteAverage.toFixed(1)}</p>
            </div>
            <p className="text-sm text-gray-400 mt-2">{getGenreNames(data)}</p>
            <h2 className="mt-6 text-lg font-semibold">Özet</h2>
            <p className="mt-2 text-gray-200 max-w-2xl">{data.overview}</p>
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-gray-900 px-6 py-2 rounded font-semibold mt-6"
              >
                Fragmanı İzle
              </a>
            )}
          </div>
        </div>
      </section>
      <CastRow cast={data.cast} />
    </div>
  );
};

export default MovieDetailPage;
