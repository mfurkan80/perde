import type { WatchLocation } from "../types/watchLog";

export const LOCATION_OPTIONS: { value: WatchLocation; label: string }[] = [
  { value: "cinema", label: "Sinema" },
  { value: "home", label: "Evde" },
  { value: "other", label: "Başka" },
];

export const getLocationLabel = (location: WatchLocation) =>
  LOCATION_OPTIONS.find((option) => option.value === location)?.label ??
  location;

const pad = (value: number) => String(value).padStart(2, "0");

export const getTodayString = () => {
  const now = new Date();
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
};

const toLocalDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const formatWatchDate = (value: string) =>
  toLocalDate(value).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const formatWatchMonth = (value: string) =>
  toLocalDate(value).toLocaleDateString("tr-TR", {
    month: "long",
    year: "numeric",
  });

export const getWatchDay = (value: string) => toLocalDate(value).getDate();
