import type { MediaType } from "../types/movie";
import type { NewWatchLog, WatchLog, WatchLogFields } from "../types/watchLog";

const API_URL = import.meta.env.VITE_API_URL;

const request = async (
  token: string,
  path: string,
  options: { method?: string; body?: unknown } = {},
) => {
  const response = await fetch(`${API_URL}/watch-logs${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "İşlem gerçekleştirilemedi.");
  }

  return data;
};

export const fetchWatchLogs = async (token: string): Promise<WatchLog[]> =>
  (await request(token, "")).logs;

export const fetchMediaWatchLogs = async (
  token: string,
  mediaType: MediaType,
  mediaId: number,
): Promise<WatchLog[]> =>
  (await request(token, `/${mediaType}/${mediaId}`)).logs;

export const createWatchLog = async (
  token: string,
  log: NewWatchLog,
): Promise<void> => {
  await request(token, "", { method: "POST", body: log });
};

export const updateWatchLog = async (
  token: string,
  id: number,
  fields: WatchLogFields,
): Promise<void> => {
  await request(token, `/${id}`, { method: "PUT", body: fields });
};

export const deleteWatchLog = async (
  token: string,
  id: number,
): Promise<void> => {
  await request(token, `/${id}`, { method: "DELETE" });
};
