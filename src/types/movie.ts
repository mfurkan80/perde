export type MediaType = "movie" | "tv";

export interface MovieSummary {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  posterPath?: string;
  adult: boolean;
  backdropPath?: string;
  mediaType: MediaType;
}

// Sayfalı listelerin (keşfet, arama) uygulama içindeki hâli.
export interface MediaPage {
  items: MovieSummary[];
  page: number;
  totalPages: number;
  totalResults: number;
}

export type SortKey = "popular" | "top_rated" | "newest";

export interface MovieDetail extends MovieSummary {
  genres: Genre[];
  runtime?: number;
  tagline?: string;
  cast: CastMember[];
  videos: Video[];
  similar: MovieSummary[];
  seasonCount?: number;
  episodeCount?: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profilePath?: string;
}

export interface Video {
  key: string;
  name: string;
  type: string;
  language: string;
}
