import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteWatchLog,
  fetchMediaWatchLogs,
  fetchWatchLogs,
} from "../api/watchLogs";
import { useAppSelector } from "../store/hooks";
import type { MediaType } from "../types/movie";

export const useAllWatchLogs = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: ["watchLogs", user?.id, "all"],
    queryFn: () => fetchWatchLogs(token!),
    enabled: !!token && !!user,
  });
};

export const useMediaWatchLogs = (mediaType: MediaType, mediaId: number) => {
  const { user, token } = useAppSelector((state) => state.auth);

  return useQuery({
    queryKey: ["watchLogs", user?.id, mediaType, mediaId],
    queryFn: () => fetchMediaWatchLogs(token!, mediaType, mediaId),
    enabled: !!token && !!user,
  });
};

export const useDeleteWatchLog = () => {
  const token = useAppSelector((state) => state.auth.token);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteWatchLog(token!, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["watchLogs"] });
    },
  });
};
