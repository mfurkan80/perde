import type { MediaType, SortKey } from "../types/movie";
import type {
  MovieCategory,
  TmdbGenreListResponse,
  TmdbMovieDetail,
  TmdbMovieListResponse,
  TmdbMultiListResponse,
  TmdbTvDetail,
  TmdbTvListResponse,
  TvCategory,
} from "../types/tmdb";

const BASE_URL = `${import.meta.env.VITE_API_URL}/tmdb`;

const getJson = async <T>(url: string, errorMessage: string): Promise<T> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  return response.json();
};

export const fetchMovieDetail = (id: string): Promise<TmdbMovieDetail> =>
  getJson(
    `${BASE_URL}/movie/${id}?language=tr-TR&append_to_response=credits,videos,similar&include_video_language=tr,en`,
    "Film bilgisi yüklenemedi.",
  );

export const fetchTvDetail = (id: string): Promise<TmdbTvDetail> =>
  getJson(
    `${BASE_URL}/tv/${id}?language=tr-TR&append_to_response=credits,videos,similar&include_video_language=tr,en`,
    "Dizi bilgisi yüklenemedi.",
  );

export const fetchMoviesByCategory = (
  category: MovieCategory,
  page: number,
): Promise<TmdbMovieListResponse> =>
  getJson(
    `${BASE_URL}/movie/${category}?language=tr-TR&page=${page}`,
    "Filmler yüklenemedi.",
  );

export const fetchTvByCategory = (
  category: TvCategory,
  page: number,
): Promise<TmdbTvListResponse> =>
  getJson(
    `${BASE_URL}/tv/${category}?language=tr-TR&page=${page}`,
    "Diziler yüklenemedi.",
  );

// --- Arama ---

const searchUrl = (path: string, query: string, page: number) =>
  `${BASE_URL}/search/${path}?query=${encodeURIComponent(query)}&language=tr-TR&page=${page}`;

export const searchMulti = (
  query: string,
  page: number,
): Promise<TmdbMultiListResponse> =>
  getJson(searchUrl("multi", query, page), "Arama başarısız oldu.");

export const searchMovies = (
  query: string,
  page: number,
): Promise<TmdbMovieListResponse> =>
  getJson(searchUrl("movie", query, page), "Arama başarısız oldu.");

export const searchTv = (
  query: string,
  page: number,
): Promise<TmdbTvListResponse> =>
  getJson(searchUrl("tv", query, page), "Arama başarısız oldu.");

// --- Tür listesi ve keşfet ---

// Film ve dizi türlerinin id'leri FARKLI (film "Aksiyon" = 28, dizi "Aksiyon & Macera" = 10759).
export const fetchGenres = (
  mediaType: MediaType,
): Promise<TmdbGenreListResponse> =>
  getJson(
    `${BASE_URL}/genre/${mediaType}/list?language=tr-TR`,
    "Türler yüklenemedi.",
  );

export interface DiscoverFilters {
  genreIds: number[];
  sort: SortKey;
  page: number;
}

const buildDiscoverParams = (
  mediaType: MediaType,
  { genreIds, sort, page }: DiscoverFilters,
) => {
  // Filmde çıkış tarihi alanı ile dizide ilk yayın tarihi alanının adı farklı.
  const dateField =
    mediaType === "movie" ? "primary_release_date" : "first_air_date";

  const params = new URLSearchParams({
    language: "tr-TR",
    page: String(page),
    include_adult: "false",
  });

  // Virgül = VE: seçilen türlerin HEPSİNİ içerenler.
  if (genreIds.length > 0) {
    params.set("with_genres", genreIds.join(","));
  }

  switch (sort) {
    case "popular":
      params.set("sort_by", "popularity.desc");
      break;
    case "top_rated":
      // Oy eşiği olmadan 1 kişinin 10 verdiği bilinmeyen yapımlar en üste çıkar.
      params.set("sort_by", "vote_average.desc");
      params.set("vote_count.gte", "300");
      break;
    case "newest":
      // Bugünden sonrası "henüz çıkmamış" demek; oy eşiği de 0 oylu kişisel yüklemeleri eler.
      params.set("sort_by", `${dateField}.desc`);
      params.set(`${dateField}.lte`, new Date().toISOString().slice(0, 10));
      params.set("vote_count.gte", "20");
      break;
  }

  return params;
};

export const discoverMovies = (
  filters: DiscoverFilters,
): Promise<TmdbMovieListResponse> =>
  getJson(
    `${BASE_URL}/discover/movie?${buildDiscoverParams("movie", filters)}`,
    "Filmler yüklenemedi.",
  );

export const discoverTv = (
  filters: DiscoverFilters,
): Promise<TmdbTvListResponse> =>
  getJson(
    `${BASE_URL}/discover/tv?${buildDiscoverParams("tv", filters)}`,
    "Diziler yüklenemedi.",
  );
