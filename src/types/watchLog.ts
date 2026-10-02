import type { MediaType } from "./movie";

export type WatchLocation = "cinema" | "home" | "other";

export interface WatchLog {
  id: number;
  mediaId: number;
  mediaType: MediaType;
  watchedOn: string;
  companions: string | null;
  location: WatchLocation | null;
  rating: number | null;
  note: string | null;
  createdAt: string;
}

export interface WatchLogFields {
  watchedOn: string;
  companions: string;
  location: WatchLocation | null;
  rating: number | null;
  note: string;
}

export interface NewWatchLog extends WatchLogFields {
  mediaId: number;
  mediaType: MediaType;
}
