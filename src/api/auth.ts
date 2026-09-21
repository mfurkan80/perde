import type { User } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (
  email: string,
  password: string,
  username: string,
): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Kayıt başarısız.");
  }
  return data;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<{ token: string; user: User }> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Giriş yapma işlemi başarısız oldu.");
  }
  return data;
};

export const fetchCurrentUser = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Kullanıcı bilgisi alınamadı.");
  }
  return data.user;
};

export const updateProfile = async (
  token: string,
  username: string,
  email: string,
): Promise<{ user: User }> => {
  const response = await fetch(`${API_URL}/auth/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ username, email }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Profil güncellenemedi.");
  }
  return data;
};

export const updatePassword = async (
  token: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/auth/password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "Şifre güncellenemedi.");
  }
};
