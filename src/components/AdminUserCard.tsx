import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteUser } from "../api/admin";
import { useAppSelector } from "../store/hooks";
import type { AdminUser } from "../types/admin";

interface AdminUserCardProps {
  user: AdminUser;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const AdminUserCard = ({ user }: AdminUserCardProps) => {
  const { user: currentUser, token } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [isConfirming, setIsConfirming] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const isSelf = currentUser?.id === user.id;
  const isAdmin = user.role === "admin";
  const canDelete = !isSelf && !isAdmin;

  const deleteMutation = useMutation({
    mutationFn: () => deleteUser(token!, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  const closeConfirm = () => {
    setIsConfirming(false);
    setConfirmText("");
  };

  const stats = [
    { label: "yorum", value: user.commentCount },
    { label: "favori", value: user.favoriteCount },
    { label: "izleme", value: user.watchCount },
  ];

  return (
    <li className="rounded-lg bg-gray-900 p-4">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold">{user.username}</span>
            {isAdmin && (
              <span className="rounded bg-yellow-400/10 px-2 py-0.5 text-xs text-yellow-400">
                Admin
              </span>
            )}
            {isSelf && (
              <span className="rounded bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                Sen
              </span>
            )}
          </div>
          <p className="text-sm break-all text-gray-400">{user.email}</p>
        </div>
        <p className="shrink-0 text-xs text-gray-500">
          {formatDate(user.createdAt)} tarihinde katıldı
        </p>
      </div>

      <p className="mt-3 text-sm text-gray-300">
        {stats.map((stat) => `${stat.value} ${stat.label}`).join(" · ")}
      </p>

      {canDelete &&
        (isConfirming ? (
          <div className="mt-4 rounded border border-red-500/40 bg-red-500/5 p-3">
            <p className="text-sm text-gray-200">
              Bu işlem geri alınamaz. Kullanıcının hesabı, yorumları, favorileri
              ve izleme kayıtları kalıcı olarak silinecek.
            </p>
            <label className="mt-3 block text-sm text-gray-400">
              Onaylamak için{" "}
              <span className="font-semibold text-white">{user.username}</span>{" "}
              yaz:
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                autoComplete="off"
                className="mt-1.5 w-full rounded border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm text-white focus:ring-2 focus:ring-gray-600 focus:outline-none"
              />
            </label>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => deleteMutation.mutate()}
                disabled={
                  confirmText !== user.username || deleteMutation.isPending
                }
                className="rounded bg-red-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {deleteMutation.isPending
                  ? "Siliniyor..."
                  : "Kalıcı olarak sil"}
              </button>
              <button
                type="button"
                onClick={closeConfirm}
                disabled={deleteMutation.isPending}
                className="text-sm text-gray-400 hover:text-white disabled:opacity-50"
              >
                Vazgeç
              </button>
              {deleteMutation.isError && (
                <span className="text-sm text-red-400">
                  {deleteMutation.error.message}
                </span>
              )}
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsConfirming(true)}
            className="mt-3 text-sm text-gray-400 hover:text-red-400"
          >
            Kullanıcıyı sil
          </button>
        ))}
    </li>
  );
};

export default AdminUserCard;
