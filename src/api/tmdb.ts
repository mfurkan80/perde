import type {
  MovieCategory,
  TmdbMovieDetail,
  TmdbMovieListResponse,
} from "../types/tmdb";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  accept: "application/json",
};

export const fetchMovieDetail = async (
  id: string,
): Promise<TmdbMovieDetail> => {
  const response = await fetch(`${BASE_URL}/movie/${id}?language=tr-TR`, {
    headers,
  });
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
    { headers },
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
    { headers },
  );
  if (!response.ok) {
    throw new Error("Kategori çekimi başarısız oldu.");
  }
  const data = await response.json();
  return data;
};
