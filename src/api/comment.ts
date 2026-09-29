import type { Comment, NewComment } from "../types/comment";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchComments = async (
  mediaType: "movie" | "tv",
  mediaId: number,
  token: string | null,
): Promise<Comment[]> => {
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/comments/${mediaType}/${mediaId}`, {
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Yorumlar yüklenemedi.");
  }

  return data.comments;
};

export const postComment = async (
  token: string,
  comment: NewComment,
): Promise<void> => {
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "Yorum gönderilemedi.");
  }
};
