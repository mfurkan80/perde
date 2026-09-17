const API_URL = import.meta.env.VITE_API_URL;

export const fetchFavorites = async (token: string): Promise<number[]> => {
  const response = await fetch(`${API_URL}/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Favoriler alınamadı");
  }

  return data.movieIds;
};

export const addFavorite = async (
  token: string,
  movieId: number,
): Promise<void> => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ movieId }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "Favorilere eklenemedi.");
  }
};

export const removeFavorite = async (
  token: string,
  movieId: number,
): Promise<void> => {
  const response = await fetch(`${API_URL}/favorites/${movieId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "Favorilerden silinemedi.");
  }
};
