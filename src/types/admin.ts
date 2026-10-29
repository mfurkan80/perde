import type { UserRole } from "./auth";
import type { MediaType } from "./movie";
import type { WatchLog } from "./watchLog";

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
  repliedAt: string | null;
  username: string | null;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  emailVerifiedAt: string | null;
  commentCount: number;
  favoriteCount: number;
  watchCount: number;
}

export interface AdminUserComment {
  id: number;
  mediaId: number;
  mediaType: MediaType;
  parentId: number | null;
  content: string;
  isSpoiler: boolean;
  status: CommentStatus;
  createdAt: string;
}

export interface AdminUserFavorite {
  mediaId: number;
  mediaType: MediaType;
  createdAt: string;
}

export interface AdminUserActivity {
  comments: AdminUserComment[];
  favorites: AdminUserFavorite[];
  watchLogs: WatchLog[];
}
