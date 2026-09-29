import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type SyntheticEvent } from "react";
import { postComment } from "../api/comment";
import { useAppSelector } from "../store/hooks";

interface CommentFormProps {
  mediaType: "movie" | "tv";
  mediaId: number;
  parentId?: number;
  onSuccess?: () => void;
}

// Backend'deki sınırlarla aynı olmalı.
const MIN_LENGTH = 2;
const MAX_LENGTH = 2000;

const CommentForm = ({
  mediaType,
  mediaId,
  parentId,
  onSuccess,
}: CommentFormProps) => {
  const token = useAppSelector((state) => state.auth.token);
  const queryClient = useQueryClient();

  const [content, setContent] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () =>
      postComment(token!, {
        mediaId,
        mediaType,
        content: content.trim(),
        isSpoiler,
        parentId,
      }),
    onSuccess: () => {
      setContent("");
      setIsSpoiler(false);
      // Önek eşleşmesi: kullanıcı id'si ne olursa olsun bu içeriğin
      // bütün yorum önbelleklerini bayat say.
      queryClient.invalidateQueries({
        queryKey: ["comments", mediaType, mediaId],
      });
      onSuccess?.();
    },
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (content.trim().length < MIN_LENGTH) {
      setError(`Yorum en az ${MIN_LENGTH} karakter olmalıdır.`);
      return;
    }

    setError(null);
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          parentId ? "Yanıtını yaz..." : "Bu içerik hakkında ne düşünüyorsun?"
        }
        rows={parentId ? 2 : 4}
        maxLength={MAX_LENGTH}
        className="w-full resize-none rounded border border-gray-700 bg-gray-800 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
          <input
            type="checkbox"
            checked={isSpoiler}
            onChange={(e) => setIsSpoiler(e.target.checked)}
            className="size-4 accent-red-500"
          />
          Spoiler içeriyor
        </label>

        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            {content.length} / {MAX_LENGTH}
          </span>
          <button
            type="submit"
            disabled={mutation.isPending}
            className="rounded bg-white px-4 py-1.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200 disabled:opacity-50"
          >
            {mutation.isPending ? "Gönderiliyor..." : "Gönder"}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {mutation.isError && (
        <p className="text-sm text-red-400">{mutation.error.message}</p>
      )}
    </form>
  );
};

export default CommentForm;
