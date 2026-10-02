import { useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteWatchLog } from "../hooks/useWatchLogs";
import type { MovieDetail } from "../types/movie";
import type { WatchLog } from "../types/watchLog";
import { getPosterUrl, getReleaseYear } from "../utils/movieHelpers";
import { formatWatchDate, getLocationLabel } from "../utils/watchLog";
import WatchLogModal from "./WatchLogModal";

interface WatchLogEntryProps {
  log: WatchLog;
  title: string;
  showMedia?: boolean;
  media?: MovieDetail;
}

const WatchLogEntry = ({
  log,
  title,
  showMedia = false,
  media,
}: WatchLogEntryProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const deleteMutation = useDeleteWatchLog();

  const mediaUrl = `/${log.mediaType}/${log.mediaId}`;

  const details = [
    log.location && getLocationLabel(log.location),
    log.companions,
  ].filter(Boolean);

  return (
    <li className="flex gap-4 rounded-lg bg-gray-900 p-4">
      {showMedia &&
        (media ? (
          <Link to={mediaUrl} className="shrink-0">
            <img
              src={getPosterUrl(media)}
              alt={media.title}
              className="aspect-2/3 w-16 rounded object-cover md:w-20"
            />
          </Link>
        ) : (
          <div className="aspect-2/3 w-16 shrink-0 animate-pulse rounded bg-gray-800 md:w-20" />
        ))}

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
          <div className="min-w-0">
            {showMedia ? (
              <>
                {media ? (
                  <Link to={mediaUrl} className="font-semibold hover:underline">
                    {media.title}
                    <span className="ml-2 text-sm font-normal text-gray-400">
                      {getReleaseYear(media)}
                    </span>
                  </Link>
                ) : (
                  <div className="my-1 h-4 w-40 animate-pulse rounded bg-gray-800" />
                )}
                <p className="text-sm text-gray-400">
                  {formatWatchDate(log.watchedOn)}
                </p>
              </>
            ) : (
              <p className="font-semibold">{formatWatchDate(log.watchedOn)}</p>
            )}
          </div>

          {log.rating !== null && (
            <span className="shrink-0 font-semibold text-yellow-400">
              ★ {log.rating}
            </span>
          )}
        </div>

        {details.length > 0 && (
          <p className="mt-1 text-sm text-gray-300">{details.join(" · ")}</p>
        )}

        {log.note && (
          <p className="mt-2 whitespace-pre-line text-sm text-gray-200">
            {log.note}
          </p>
        )}

        {isConfirmingDelete ? (
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
            <span className="text-gray-300">Bu kayıt silinsin mi?</span>
            <button
              type="button"
              onClick={() => deleteMutation.mutate(log.id)}
              disabled={deleteMutation.isPending}
              className="rounded bg-red-600 px-3 py-1 font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-50"
            >
              {deleteMutation.isPending ? "Siliniyor..." : "Evet, sil"}
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmingDelete(false)}
              disabled={deleteMutation.isPending}
              className="text-gray-400 hover:text-white disabled:opacity-50"
            >
              Vazgeç
            </button>
            {deleteMutation.isError && (
              <span className="text-red-400">
                {deleteMutation.error.message}
              </span>
            )}
          </div>
        ) : (
          <div className="mt-3 flex gap-4 text-xs">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-white"
            >
              Düzenle
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmingDelete(true)}
              className="text-gray-400 hover:text-red-400"
            >
              Sil
            </button>
          </div>
        )}
      </div>

      {isEditing && (
        <WatchLogModal
          mediaId={log.mediaId}
          mediaType={log.mediaType}
          title={title}
          log={log}
          onClose={() => setIsEditing(false)}
        />
      )}
    </li>
  );
};

export default WatchLogEntry;
