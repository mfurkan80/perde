export interface Comment {
  id: number;
  parentId: number | null;
  content: string;
  isSpoiler: boolean;
  status: "pending" | "approved";
  createdAt: string;
  username: string;
  replies?: Comment[];
}

// Sunucuya giden veri: id, status, username, createdAt'i sunucu belirler.
export interface NewComment {
  mediaId: number;
  mediaType: "movie" | "tv";
  content: string;
  isSpoiler: boolean;
  parentId?: number;
}
