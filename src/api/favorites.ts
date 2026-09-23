const API_URL = import.meta.env.VITE_API_URL;

export interface FavoriteItem {
  mediaId: number;
  mediaType: "movie" | "tv";
}

export const fetchFavorites = async (
  token: string,
): Promise<FavoriteItem[]> => {
  const response = await fetch(`${API_URL}/favorites`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Favoriler alınamadı");
  }

  return data.favorites;
};

export const addFavorite = async (
  token: string,
  mediaId: number,
  mediaType: "movie" | "tv",
): Promise<void> => {
  const response = await fetch(`${API_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mediaId, mediaType }),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "Favorilere eklenemedi.");
  }
};

export const removeFavorite = async (
  token: string,
  mediaId: number,
  mediaType: "movie" | "tv",
): Promise<void> => {
  const response = await fetch(`${API_URL}/favorites/${mediaType}/${mediaId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message ?? "Favorilerden silinemedi.");
  }
};
