import type { UserRole } from "./auth";
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

export interface AdminMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  username: string | null;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  commentCount: number;
  favoriteCount: number;
  watchCount: number;
}
