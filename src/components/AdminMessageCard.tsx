import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { deleteMessage, setMessageRead } from "../api/admin";
import { useAppSelector } from "../store/hooks";
import type { AdminMessage } from "../types/admin";

interface AdminMessageCardProps {
  message: AdminMessage;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString("tr-TR", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

const AdminMessageCard = ({ message }: AdminMessageCardProps) => {
  const token = useAppSelector((state) => state.auth.token);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (isRead: boolean) => setMessageRead(token!, message.id, isRead),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
    },
  });

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteMessage(token!, message.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "messages"] });
    },
  });

  const replyHref = `mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`;

  return (
    <li
      className={`rounded-lg border-l-4 bg-gray-900 p-4 ${
        message.isRead ? "border-transparent" : "border-yellow-400"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="min-w-0">
          <p
            className={
              message.isRead ? "font-semibold text-gray-300" : "font-bold"
            }
          >
            {message.subject}
          </p>
          <p className="text-sm break-all text-gray-400">
            {message.name} · {message.email}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs">
          {message.username ? (
            <span className="rounded bg-blue-500/10 px-2 py-0.5 text-blue-400">
              @{message.username}
            </span>
          ) : (
            <span className="rounded bg-gray-700 px-2 py-0.5 text-gray-300">
              Misafir
            </span>
          )}
          <span className="text-gray-500">{formatDate(message.createdAt)}</span>
        </div>
      </div>

      <p className="mt-3 whitespace-pre-line text-gray-200">
        {message.message}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <a
          href={replyHref}
          className="rounded bg-white px-4 py-1.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-200"
        >
          Yanıtla
        </a>

        <button
          type="button"
          onClick={() => mutation.mutate(!message.isRead)}
          disabled={mutation.isPending}
          className="text-sm text-gray-400 hover:text-white disabled:opacity-50"
        >
          {message.isRead ? "Okunmadı yap" : "Okundu işaretle"}
        </button>

        {isConfirmingDelete ? (
          <>
            <span className="text-sm text-gray-300">Bu mesaj silinsin mi?</span>
            <button
              type="button"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
              className="rounded bg-red-600 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-50"
            >
              {deleteMutation.isPending ? "Siliniyor..." : "Evet, sil"}
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmingDelete(false)}
              disabled={deleteMutation.isPending}
              className="text-sm text-gray-400 hover:text-white disabled:opacity-50"
            >
              Vazgeç
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsConfirmingDelete(true)}
            className="text-sm text-gray-400 hover:text-red-400"
          >
            Sil
          </button>
        )}

        {mutation.isError && (
          <span className="text-sm text-red-400">{mutation.error.message}</span>
        )}
        {deleteMutation.isError && (
          <span className="text-sm text-red-400">
            {deleteMutation.error.message}
          </span>
        )}
      </div>
    </li>
  );
};

export default AdminMessageCard;
