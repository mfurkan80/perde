import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { addFavorite, fetchFavorites, removeFavorite } from "../api/favorites";

interface FavoriteButtonProps {
  movieId: number;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const { user, token } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: favorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => fetchFavorites(token!),
    enabled: !!token,
  });

  const isFavorite = favorites?.includes(movieId) ?? false;

  const mutation = useMutation({
    mutationFn: () =>
      isFavorite
        ? removeFavorite(token!, movieId)
        : addFavorite(token!, movieId),

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
      className="flex items-center gap-2 px-6 py-2 rounded font-semibold border border-gray-600 hover:bg-gray-800 disabled:opacity-50"
    >
      <span className={isFavorite ? "text-red-500" : "text-gray-400"}>
        {isFavorite ? "♥" : "♡"}
      </span>
      {isFavorite ? "Favorilerde" : "Favorilere Ekle"}
    </button>
  );
};

export default FavoriteButton;
