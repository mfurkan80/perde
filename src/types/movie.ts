export interface Movie {
  id: number;
  title: string;
  overview: string;
  releaseDate: string;
  voteAverage: number;
  posterPath?: string;
  adult: boolean;
  genres: Genre[];
}

export interface Genre {
  id: number;
  name: string;
}
