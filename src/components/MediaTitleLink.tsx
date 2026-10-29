import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchMediaDetail } from "../api/media";
import type { MediaType } from "../types/movie";

interface MediaTitleLinkProps {
  mediaType: MediaType;
  mediaId: number;
}

const MediaTitleLink = ({ mediaType, mediaId }: MediaTitleLinkProps) => {
  const { data: media } = useQuery({
    queryKey: ["media", mediaType, String(mediaId)],
    queryFn: () => fetchMediaDetail(mediaType, String(mediaId)),
  });

  return (
    <Link
      to={`/${mediaType}/${mediaId}`}
      className="font-semibold hover:underline"
    >
      {media?.title ?? "Yükleniyor..."}
    </Link>
  );
};

export default MediaTitleLink;
