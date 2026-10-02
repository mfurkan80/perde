import { useMediaWatchLogs } from "../hooks/useWatchLogs";
import type { MediaType } from "../types/movie";
import WatchLogEntry from "./WatchLogEntry";

interface WatchHistoryProps {
  mediaId: number;
  mediaType: MediaType;
  title: string;
}

const WatchHistory = ({ mediaId, mediaType, title }: WatchHistoryProps) => {
  const { data: logs } = useMediaWatchLogs(mediaType, mediaId);

  if (!logs || logs.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <h2 className="mb-1 text-xl font-semibold">İzleme Geçmişin</h2>
      <p className="mb-4 text-sm text-gray-400">
        Bu kayıtları sadece sen görürsün.
      </p>
      <ul className="flex max-w-3xl flex-col gap-3">
        {logs.map((log) => (
          <WatchLogEntry key={log.id} log={log} title={title} />
        ))}
      </ul>
    </section>
  );
};

export default WatchHistory;
