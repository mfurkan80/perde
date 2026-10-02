import type { MediaType, MovieDetail } from "../types/movie";
import { mapMovieDetail, mapTvDetail } from "./mappers";
import { fetchMovieDetail, fetchTvDetail } from "./tmdb";

export const fetchMediaDetail = async (
  mediaType: MediaType,
  id: string,
): Promise<MovieDetail> => {
  if (mediaType === "movie") {
    return mapMovieDetail(await fetchMovieDetail(id));
  }

  return mapTvDetail(await fetchTvDetail(id));
};
