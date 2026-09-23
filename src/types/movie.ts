export interface MovieSummary {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  posterPath?: string;
  adult: boolean;
  backdropPath?: string;
  mediaType: "movie" | "tv";
}

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
