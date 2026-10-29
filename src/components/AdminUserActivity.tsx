import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchUserActivity } from "../api/admin";
import { useAppSelector } from "../store/hooks";
import type { CommentStatus } from "../types/admin";
import { formatWatchDate, getLocationLabel } from "../utils/watchLog";
import MediaTitleLink from "./MediaTitleLink";
import Spinner from "./Spinner";

interface AdminUserActivityProps {
  userId: number;
}

type Tab = "comments" | "favorites" | "watchLogs";

const STATUS_LABELS: Record<
  CommentStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Onay bekliyor",
    className: "bg-yellow-400/10 text-yellow-400",
  },
  approved: { label: "Onaylı", className: "bg-green-500/10 text-green-400" },
  rejected: { label: "Reddedildi", className: "bg-red-500/10 text-red-400" },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const AdminUserActivity = ({ userId }: AdminUserActivityProps) => {
  const token = useAppSelector((state) => state.auth.token);
  const [tab, setTab] = useState<Tab>("comments");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "users", userId, "activity"],
    queryFn: () => fetchUserActivity(token!, userId),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-sm text-red-400">{error.message}</p>;
  }

  if (!data) {
    return null;
  }

  const tabs: { value: Tab; label: string; count: number }[] = [
    { value: "comments", label: "Yorumlar", count: data.comments.length },
    { value: "favorites", label: "Favoriler", count: data.favorites.length },
    { value: "watchLogs", label: "İzlemeler", count: data.watchLogs.length },
  ];

  const empty = (text: string) => (
    <p className="py-4 text-center text-sm text-gray-500">{text}</p>
  );

  return (
    <div className="mt-4 border-t border-gray-800 pt-4">
      <div className="mb-3 flex flex-wrap gap-2">
        {tabs.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => setTab(item.value)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
              tab === item.value
                ? "bg-white text-gray-900"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.label} ({item.count})
          </button>
        ))}
      </div>

      {tab === "comments" &&
        (data.comments.length === 0 ? (
          empty("Yorum yok.")
        ) : (
          <ul className="flex flex-col gap-2">
            {data.comments.map((comment) => (
              <li
                key={comment.id}
                className="rounded bg-gray-800/60 p-3 text-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <MediaTitleLink
                    mediaType={comment.mediaType}
                    mediaId={comment.mediaId}
                  />
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                  <span
                    className={`rounded px-2 py-0.5 text-xs ${STATUS_LABELS[comment.status].className}`}
                  >
                    {STATUS_LABELS[comment.status].label}
                  </span>
                  {comment.parentId !== null && (
                    <span className="rounded bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">
                      Yanıt
                    </span>
                  )}
                  {comment.isSpoiler && (
                    <span className="rounded bg-red-500/10 px-2 py-0.5 text-xs text-red-400">
                      Spoiler
                    </span>
                  )}
                </div>
                <p className="mt-1.5 whitespace-pre-line text-gray-200">
                  {comment.content}
                </p>
              </li>
            ))}
          </ul>
        ))}

      {tab === "favorites" &&
        (data.favorites.length === 0 ? (
          empty("Favori yok.")
        ) : (
          <ul className="flex flex-col gap-1">
            {data.favorites.map((favorite) => (
              <li
                key={`${favorite.mediaType}-${favorite.mediaId}`}
                className="flex flex-wrap items-center gap-2 rounded bg-gray-800/60 px-3 py-2 text-sm"
              >
                <MediaTitleLink
                  mediaType={favorite.mediaType}
                  mediaId={favorite.mediaId}
                />
                <span className="text-xs text-gray-500">
                  {favorite.mediaType === "movie" ? "Film" : "Dizi"} ·{" "}
                  {formatDate(favorite.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        ))}

      {tab === "watchLogs" &&
        (data.watchLogs.length === 0 ? (
          empty("İzleme kaydı yok.")
        ) : (
          <ul className="flex flex-col gap-2">
            {data.watchLogs.map((log) => {
              const details = [
                formatWatchDate(log.watchedOn),
                log.location && getLocationLabel(log.location),
                log.companions && `${log.companions} ile`,
                log.rating !== null && `${log.rating}/10`,
              ].filter(Boolean);

              return (
                <li key={log.id} className="rounded bg-gray-800/60 p-3 text-sm">
                  <MediaTitleLink
                    mediaType={log.mediaType}
                    mediaId={log.mediaId}
                  />
                  <p className="mt-0.5 text-xs text-gray-400">
                    {details.join(" · ")}
                  </p>
                  {log.note && (
                    <p className="mt-1.5 whitespace-pre-line text-gray-200">
                      {log.note}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        ))}
    </div>
  );
};

export default AdminUserActivity;
