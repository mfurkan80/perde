import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { addFavorite, fetchFavorites, removeFavorite } from "../api/favorites";

interface FavoriteButtonProps {
  mediaId: number;
  mediaType: "movie" | "tv";
}

const FavoriteButton = ({ mediaId, mediaType }: FavoriteButtonProps) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: favorites } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: () => fetchFavorites(token!),
    enabled: !!token && !!user,
  });

  const isFavorite =
    favorites?.some(
      (fav) => fav.mediaId === mediaId && fav.mediaType === mediaType,
    ) ?? false;

  const mutation = useMutation({
    mutationFn: () =>
      isFavorite
        ? removeFavorite(token!, mediaId, mediaType)
        : addFavorite(token!, mediaId, mediaType),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const handleClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      disabled={mutation.isPending}
      className="flex items-center justify-center gap-2 rounded border border-gray-600 px-3 py-2 text-sm font-semibold hover:bg-gray-800 disabled:opacity-50 sm:px-6 sm:text-base"
    >
      <span className={isFavorite ? "text-red-500" : "text-gray-400"}>
        {isFavorite ? "♥" : "♡"}
      </span>
      {isFavorite ? "Favorilerde" : "Favorilere Ekle"}
    </button>
  );
};

export default FavoriteButton;
