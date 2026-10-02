import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type SyntheticEvent } from "react";
import { createPortal } from "react-dom";
import { createWatchLog, updateWatchLog } from "../api/watchLogs";
import { useAppSelector } from "../store/hooks";
import type { MediaType } from "../types/movie";
import type {
  WatchLocation,
  WatchLog,
  WatchLogFields,
} from "../types/watchLog";
import { getTodayString, LOCATION_OPTIONS } from "../utils/watchLog";
import { CloseIcon } from "./Icons";

interface WatchLogModalProps {
  mediaId: number;
  mediaType: MediaType;
  title: string;
  log?: WatchLog;
  onClose: () => void;
}

const COMPANIONS_MAX = 255;
const NOTE_MAX = 2000;
const RATINGS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const inputClass =
  "w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600";

const chipClass = (isActive: boolean) =>
  `rounded border px-3 py-1.5 text-sm transition-colors ${
    isActive
      ? "border-white bg-white font-semibold text-gray-900"
      : "border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
  }`;

const WatchLogModal = ({
  mediaId,
  mediaType,
  title,
  log,
  onClose,
}: WatchLogModalProps) => {
  const token = useAppSelector((state) => state.auth.token);
  const queryClient = useQueryClient();
  const today = getTodayString();

  const [watchedOn, setWatchedOn] = useState(log?.watchedOn ?? today);
  const [companions, setCompanions] = useState(log?.companions ?? "");
  const [location, setLocation] = useState<WatchLocation | null>(
    log?.location ?? null,
  );
  const [rating, setRating] = useState<number | null>(log?.rating ?? null);
  const [note, setNote] = useState(log?.note ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const mutation = useMutation({
    mutationFn: (fields: WatchLogFields) =>
      log
        ? updateWatchLog(token!, log.id, fields)
        : createWatchLog(token!, { ...fields, mediaId, mediaType }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchLogs"] });
      onClose();
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!watchedOn) {
      setError("Tarih seçmelisin.");
      return;
    }

    if (watchedOn > today) {
      setError("İleri bir tarih seçilemez.");
      return;
    }

    setError(null);
    mutation.mutate({
      watchedOn,
      companions: companions.trim(),
      location,
      rating,
      note: note.trim(),
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex text-white items-end justify-center sm:items-center sm:p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/70" />

      <form
        onSubmit={handleSubmit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="watch-log-title"
        className="relative flex max-h-[90vh] w-full flex-col gap-5 overflow-y-auto rounded-t-lg bg-gray-900 p-6 shadow-xl sm:max-w-lg sm:rounded-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="watch-log-title" className="text-lg font-bold">
              {log ? "İzlemeyi Düzenle" : "İzledim"}
            </h2>
            <p className="text-sm text-gray-400">{title}</p>
          </div>
          <button
            type="button"
            aria-label="Kapat"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white"
          >
            <CloseIcon className="size-5" />
          </button>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-gray-300">
          Ne zaman izledin?
          <input
            type="date"
            value={watchedOn}
            max={today}
            onChange={(e) => setWatchedOn(e.target.value)}
            className={`${inputClass} scheme-dark`}
          />
        </label>

        <div className="flex flex-col gap-1.5 text-sm text-gray-300">
          Nerede izledin?
          <div className="flex flex-wrap gap-2">
            {LOCATION_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={location === option.value}
                onClick={() =>
                  setLocation(location === option.value ? null : option.value)
                }
                className={chipClass(location === option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-gray-300">
          Kiminle izledin?
          <input
            type="text"
            value={companions}
            onChange={(e) => setCompanions(e.target.value)}
            maxLength={COMPANIONS_MAX}
            placeholder="Örn. Ayşe, Mehmet"
            className={inputClass}
          />
        </label>

        <div className="flex flex-col gap-1.5 text-sm text-gray-300">
          <span>
            Puanın
            {rating !== null && (
              <span className="ml-2 font-semibold text-yellow-400">
                ★ {rating}
              </span>
            )}
          </span>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
            {RATINGS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={rating === value}
                onClick={() => setRating(rating === value ? null : value)}
                className={chipClass(rating === value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-gray-300">
          Not
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={NOTE_MAX}
            rows={3}
            placeholder="Aklında kalanlar, düşüncelerin... Sadece sen görürsün."
            className={`${inputClass} resize-none`}
          />
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}
        {mutation.isError && (
          <p className="text-sm text-red-400">{mutation.error.message}</p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded px-4 py-2 text-sm text-gray-300 hover:text-white"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200 disabled:opacity-50"
          >
            {mutation.isPending ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </div>
      </form>
    </div>,
    document.body,
  );
};

export default WatchLogModal;
