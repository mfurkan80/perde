import type { User } from "../types/auth";

const API_URL = import.meta.env.VITE_API_URL;

export class AuthError extends Error {
  code?: string;

  constructor(message: string, code?: string) {
    super(message);
    this.code = code;
  }
}

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
    throw new AuthError(
      data.message ?? "Giriş yapma işlemi başarısız oldu.",
      data.code,
    );
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

export const requestPasswordReset = async (email: string): Promise<string> => {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "İstek gönderilemedi.");
  }
  return data.message;
};

export const resetPassword = async (
  token: string,
  password: string,
): Promise<string> => {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Şifre güncellenemedi.");
  }
  return data.message;
};

export const verifyEmail = async (token: string): Promise<string> => {
  const response = await fetch(`${API_URL}/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "E-posta doğrulanamadı.");
  }
  return data.message;
};

export const resendVerification = async (email: string): Promise<string> => {
  const response = await fetch(`${API_URL}/auth/resend-verification`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message ?? "Doğrulama e-postası gönderilemedi.");
  }
  return data.message;
};
