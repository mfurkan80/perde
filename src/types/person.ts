import type { MediaType, MovieSummary } from "./movie";

export interface Credit {
  id: number;
  mediaType: MediaType;
  title: string;
  date: string;
  character: string;
}

export interface PersonDetail {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  placeOfBirth: string | null;
  profilePath?: string;
  department: string;
  knownFor: MovieSummary[];
  credits: Credit[];
}
