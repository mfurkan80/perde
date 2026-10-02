import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaWatchLogs } from "../hooks/useWatchLogs";
import { useAppSelector } from "../store/hooks";
import type { MediaType } from "../types/movie";
import WatchLogModal from "./WatchLogModal";

interface WatchedButtonProps {
  mediaId: number;
  mediaType: MediaType;
  title: string;
}

const WatchedButton = ({ mediaId, mediaType, title }: WatchedButtonProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { data: logs } = useMediaWatchLogs(mediaType, mediaId);

  const watchCount = logs?.length ?? 0;

  const handleClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center justify-center gap-2 rounded border border-gray-600 px-3 py-2 text-sm font-semibold hover:bg-gray-800 sm:px-6 sm:text-base"
      >
        <span className={watchCount > 0 ? "text-green-400" : "text-gray-400"}>
          {watchCount > 0 ? "✓" : "+"}
        </span>
        {watchCount > 0 ? `${watchCount} kez izledin` : "İzledim"}
      </button>

      {isOpen && (
        <WatchLogModal
          mediaId={mediaId}
          mediaType={mediaType}
          title={title}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default WatchedButton;
