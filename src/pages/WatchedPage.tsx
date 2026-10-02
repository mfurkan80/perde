import { useQueries } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchMediaDetail } from "../api/media";
import Spinner from "../components/Spinner";
import WatchLogEntry from "../components/WatchLogEntry";
import { useAllWatchLogs } from "../hooks/useWatchLogs";
import type { MovieDetail } from "../types/movie";
import type { WatchLog } from "../types/watchLog";
import { formatWatchMonth } from "../utils/watchLog";

const mediaKey = (log: WatchLog) => `${log.mediaType}-${log.mediaId}`;

const groupByMonth = (logs: WatchLog[]) => {
  const groups = new Map<string, WatchLog[]>();

  for (const log of logs) {
    const month = log.watchedOn.slice(0, 7);
    groups.set(month, [...(groups.get(month) ?? []), log]);
  }

  return [...groups.entries()];
};

const summarizeMonth = (logs: WatchLog[]) => {
  const movieCount = logs.filter((log) => log.mediaType === "movie").length;
  const tvCount = logs.filter((log) => log.mediaType === "tv").length;

  return [
    movieCount > 0 && `${movieCount} film`,
    tvCount > 0 && `${tvCount} dizi`,
  ]
    .filter(Boolean)
    .join(", ");
};

const WatchedPage = () => {
  const { data: logs, isLoading, error } = useAllWatchLogs();

  const uniqueMedia = [
    ...new Map((logs ?? []).map((log) => [mediaKey(log), log])).values(),
  ];

  const mediaQueries = useQueries({
    queries: uniqueMedia.map((log) => ({
      queryKey: ["media", log.mediaType, String(log.mediaId)],
      queryFn: () => fetchMediaDetail(log.mediaType, String(log.mediaId)),
    })),
  });

  const mediaByKey = new Map<string, MovieDetail>();
  uniqueMedia.forEach((log, index) => {
    const media = mediaQueries[index]?.data;
    if (media) mediaByKey.set(mediaKey(log), media);
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-400">{error.message}</p>;
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="mt-12 text-center">
        <h1 className="text-2xl font-bold">İzlediklerim</h1>
        <p className="mt-3 text-gray-400">
          Henüz bir şey kaydetmedin. Bir filmin sayfasında "İzledim" butonuna
          bas, günlüğün burada birikmeye başlasın.
        </p>
        <Link to="/movie" className="mt-4 inline-block text-white underline">
          Filmlere göz at
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold md:text-3xl">İzlediklerim</h1>
      <p className="mt-1 text-sm text-gray-400">
        Kişisel izleme günlüğün. Bu sayfayı sadece sen görürsün.
      </p>

      {groupByMonth(logs).map(([month, monthLogs]) => (
        <section key={month} className="mt-10">
          <h2 className="mb-3 text-lg font-semibold capitalize">
            {formatWatchMonth(`${month}-01`)}
            <span className="ml-2 text-sm font-normal normal-case text-gray-500">
              · {summarizeMonth(monthLogs)}
            </span>
          </h2>
          <ul className="flex flex-col gap-3">
            {monthLogs.map((log) => {
              const media = mediaByKey.get(mediaKey(log));
              return (
                <WatchLogEntry
                  key={log.id}
                  log={log}
                  title={media?.title ?? ""}
                  showMedia
                  media={media}
                />
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default WatchedPage;
