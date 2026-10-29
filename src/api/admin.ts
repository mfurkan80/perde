import type {
  AdminComment,
  CommentStatus,
  ModerationStatus,
  AdminMessage,
  AdminUser,
  AdminUserActivity,
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

export const fetchAdminMessages = async (
  token: string,
): Promise<AdminMessage[]> => {
  const response = await fetch(`${API_URL}/admin/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Mesajlar yüklenemedi.");
  }

  return data.messages;
};

export const setMessageRead = async (
  token: string,
  id: number,
  isRead: boolean,
): Promise<void> => {
  const response = await fetch(`${API_URL}/admin/messages/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isRead }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "İşlem başarısız oldu.");
  }
};

export const replyToMessage = async (
  token: string,
  id: number,
  reply: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/admin/messages/${id}/reply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reply }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "Yanıt gönderilemedi.");
  }
};

export const deleteMessage = async (
  token: string,
  id: number,
): Promise<void> => {
  const response = await fetch(`${API_URL}/admin/messages/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "Mesaj silinemedi.");
  }
};

export const fetchAdminUsers = async (token: string): Promise<AdminUser[]> => {
  const response = await fetch(`${API_URL}/admin/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Kullanıcılar yüklenemedi.");
  }

  return data.users;
};

export const fetchUserActivity = async (
  token: string,
  id: number,
): Promise<AdminUserActivity> => {
  const response = await fetch(`${API_URL}/admin/users/${id}/activity`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Kullanıcı etkinliği yüklenemedi.");
  }

  return data;
};

export const deleteUser = async (token: string, id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "Kullanıcı silinemedi.");
  }
};
