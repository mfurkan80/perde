import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAdminComments } from "../api/admin";
import AdminCommentCard from "../components/AdminCommentCard";
import Spinner from "../components/Spinner";
import { useAppSelector } from "../store/hooks";
import type { CommentStatus } from "../types/admin";

const TABS: { value: CommentStatus; label: string }[] = [
  { value: "pending", label: "Bekleyen" },
  { value: "approved", label: "Onaylanan" },
  { value: "rejected", label: "Reddedilen" },
];

const EMPTY_MESSAGES: Record<CommentStatus, string> = {
  pending: "Onay bekleyen yorum yok.",
  approved: "Henüz onaylanmış yorum yok.",
  rejected: "Reddedilmiş yorum yok.",
};

const AdminPage = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [status, setStatus] = useState<CommentStatus>("pending");

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "comments", status],
    queryFn: () => fetchAdminComments(token!, status),
  });

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold md:text-3xl">Admin Paneli</h1>
      <h2 className="mt-8 text-lg font-semibold">Yorumlar</h2>

      <div
        role="tablist"
        className="mt-3 mb-6 flex gap-6 border-b border-gray-800"
      >
        {TABS.map((tab) => {
          const isActive = tab.value === status;
          return (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setStatus(tab.value)}
              className={`-mb-px border-b-2 pb-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-white text-white"
                  : "border-transparent text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {isLoading && <Spinner />}
      {error && <p className="text-red-400">{error.message}</p>}

      {comments &&
        (comments.length === 0 ? (
          <p className="py-12 text-center text-gray-400">
            {EMPTY_MESSAGES[status]}
          </p>
        ) : (
          <ul className="flex flex-col gap-3">
            {comments.map((comment) => (
              <AdminCommentCard key={comment.id} comment={comment} />
            ))}
          </ul>
        ))}
    </div>
  );
};

export default AdminPage;
