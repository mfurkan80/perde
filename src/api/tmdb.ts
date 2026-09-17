import type {
  MovieCategory,
  TmdbMovieDetail,
  TmdbMovieListResponse,
} from "../types/tmdb";

const BASE_URL = `${import.meta.env.VITE_API_URL}/tmdb`;

export const fetchMovieDetail = async (
  id: string,
): Promise<TmdbMovieDetail> => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?language=tr-TR&append_to_response=credits,videos,similar&include_video_language=tr,en`,
  );
  if (!response.ok) {
    throw new Error("Film bilgisi yüklenemedi.");
  }
  const data = await response.json();
  return data;
};

export const searchMovies = async (
  query: string,
  page: number,
): Promise<TmdbMovieListResponse> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=tr-TR&page=${page}`,
  );
  if (!response.ok) {
    throw new Error("Arama başarısız oldu.");
  }
  const data = await response.json();
  return data;
};

export const fetchMoviesByCategory = async (
  category: MovieCategory,
  page: number,
): Promise<TmdbMovieListResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/${category}?language=tr-TR&page=${page}`,
  );
  if (!response.ok) {
    throw new Error("Kategori çekimi başarısız oldu.");
  }
  const data = await response.json();
  return data;
};
