import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import type { Comment } from "../types/comment";
import CommentForm from "./CommentForm";

interface CommentItemProps {
  comment: Comment;
  mediaType: "movie" | "tv";
  mediaId: number;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const CommentItem = ({ comment, mediaType, mediaId }: CommentItemProps) => {
  const user = useAppSelector((state) => state.auth.user);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const isHidden = comment.isSpoiler && !isRevealed;

  const replyTargetId = comment.parentId ?? comment.id;
  const canReply = user !== null && comment.status === "approved";

  return (
    <div className="rounded-lg bg-gray-900 p-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-semibold">{comment.username}</span>
        <span className="text-gray-500">{formatDate(comment.createdAt)}</span>

        {comment.status === "pending" && (
          <span className="rounded bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-400">
            Onay bekliyor
          </span>
        )}

        {comment.isSpoiler && (
          <span className="rounded bg-red-500/10 px-2 py-0.5 text-xs text-red-400">
            Spoiler
          </span>
        )}
      </div>

      {isHidden ? (
        <button
          type="button"
          onClick={() => setIsRevealed(true)}
          className="mt-2 w-full rounded border border-dashed border-gray-700 px-4 py-3 text-left text-sm text-gray-400 transition-colors hover:border-gray-500 hover:text-gray-200"
        >
          Bu yorum spoiler içeriyor. Görmek için tıkla.
        </button>
      ) : (
        <p className="mt-2 whitespace-pre-line text-gray-200">
          {comment.content}
        </p>
      )}

      {canReply && (
        <button
          type="button"
          onClick={() => setIsReplying((prev) => !prev)}
          className="mt-3 text-sm text-gray-400 hover:text-white"
        >
          {isReplying ? "Vazgeç" : "Yanıtla"}
        </button>
      )}

      {isReplying && (
        <div className="mt-3">
          <CommentForm
            mediaType={mediaType}
            mediaId={mediaId}
            parentId={replyTargetId}
            onSuccess={() => setIsReplying(false)}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 ml-2 flex flex-col gap-3 border-l border-gray-800 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              mediaType={mediaType}
              mediaId={mediaId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
