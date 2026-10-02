import type { MediaType } from "./movie";

export type CommentStatus = "pending" | "approved" | "rejected";

export type ModerationStatus = Exclude<CommentStatus, "pending">;

export interface AdminComment {
  id: number;
  mediaId: number;
  mediaType: MediaType;
  parentId: number | null;
  content: string;
  isSpoiler: boolean;
  status: CommentStatus;
  createdAt: string;
  username: string;
}
