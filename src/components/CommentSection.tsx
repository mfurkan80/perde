import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchComments } from "../api/comment";
import { useAppSelector } from "../store/hooks";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Spinner from "./Spinner";

interface CommentSectionProps {
  mediaType: "movie" | "tv";
  mediaId: number;
}

const CommentSection = ({ mediaType, mediaId }: CommentSectionProps) => {
  const {
    user,
    token,
    isLoading: authLoading,
  } = useAppSelector((state) => state.auth);

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", mediaType, mediaId, user?.id ?? null],
    queryFn: () => fetchComments(mediaType, mediaId, token),
    enabled: !authLoading,
  });

  return (
    <section className="mb-8">
      <h2 className="mb-3 text-xl font-semibold">Yorumlar</h2>

      {user ? (
        <CommentForm mediaType={mediaType} mediaId={mediaId} />
      ) : (
        <p className="mb-6 text-gray-400">
          Yorum yapmak için{" "}
          <Link to="/login" className="text-white underline">
            giriş yap
          </Link>
          .
        </p>
      )}

      {isLoading && <Spinner />}

      {error && <p className="text-red-400">{error.message}</p>}

      {!isLoading && !error && comments && comments.length === 0 && (
        <p className="text-gray-500">Henüz yorum yok.</p>
      )}

      <div className="flex flex-col gap-4">
        {comments?.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            mediaType={mediaType}
            mediaId={mediaId}
          />
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
