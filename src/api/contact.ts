import type { ContactPayload } from "../types/contact";

const API_URL = import.meta.env.VITE_API_URL;

export const sendContactMessage = async (
  payload: ContactPayload,
  token: string | null,
): Promise<{ message: string }> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Mesaj gönderilemedi.");
  }
  return data;
};
