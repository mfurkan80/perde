import type {
  AdminComment,
  CommentStatus,
  ModerationStatus,
} from "../types/admin";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchAdminComments = async (
  token: string,
  status: CommentStatus,
): Promise<AdminComment[]> => {
  const response = await fetch(`${API_URL}/admin/comments?status=${status}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Yorumlar yüklenemedi.");
  }

  return data.comments;
};

export const moderateComment = async (
  token: string,
  id: number,
  status: ModerationStatus,
): Promise<void> => {
  const response = await fetch(`${API_URL}/admin/comments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "İşlem başarısız oldu.");
  }
};
