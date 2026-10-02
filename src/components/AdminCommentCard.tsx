import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { moderateComment } from "../api/admin";
import { fetchMediaDetail } from "../api/media";
import { useAppSelector } from "../store/hooks";
import type { AdminComment, ModerationStatus } from "../types/admin";

interface AdminCommentCardProps {
  comment: AdminComment;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("tr-TR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

const AdminCommentCard = ({ comment }: AdminCommentCardProps) => {
  const token = useAppSelector((state) => state.auth.token);
  const queryClient = useQueryClient();

  const { data: media } = useQuery({
    queryKey: ["media", comment.mediaType, String(comment.mediaId)],
    queryFn: () => fetchMediaDetail(comment.mediaType, String(comment.mediaId)),
  });

  const mutation = useMutation({
    mutationFn: (status: ModerationStatus) =>
      moderateComment(token!, comment.id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "comments"] });
      queryClient.invalidateQueries({
        queryKey: ["comments", comment.mediaType, comment.mediaId],
      });
    },
  });

  return (
    <li className="rounded-lg bg-gray-900 p-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <Link
          to={`/${comment.mediaType}/${comment.mediaId}`}
          className="font-semibold hover:underline"
        >
          {media?.title ?? "Yükleniyor..."}
        </Link>
        <span className="text-gray-500">·</span>
        <span className="text-gray-300">{comment.username}</span>
        <span className="text-gray-500">{formatDate(comment.createdAt)}</span>

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

      <p className="mt-2 whitespace-pre-line text-gray-200">
        {comment.content}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {comment.status !== "approved" && (
          <button
            type="button"
            onClick={() => mutation.mutate("approved")}
            disabled={mutation.isPending}
            className="rounded bg-green-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-green-500 disabled:opacity-50"
          >
            Onayla
          </button>
        )}
        {comment.status !== "rejected" && (
          <button
            type="button"
            onClick={() => mutation.mutate("rejected")}
            disabled={mutation.isPending}
            className="rounded bg-red-600 px-4 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-50"
          >
            Reddet
          </button>
        )}

        {mutation.isError && (
          <span className="text-sm text-red-400">{mutation.error.message}</span>
        )}
      </div>
    </li>
  );
};

export default AdminCommentCard;
