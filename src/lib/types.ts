import type { DBSchema } from "idb";

export interface SavedWord {
  id: string;
  word: string;
  meaning: string;
  url: string;
  createdAt: number;
  synced: boolean;
}

export interface AuthData {
  authToken: string;
  userId: string;
  user: User | null;
}

export interface SyncResponse {
  success: boolean;
  syncedCount?: number;
  error?: string;
}

export interface highlight extends DBSchema {
  words: {
    key: string;
    value: SavedWord;
    indexes: {
      "by-date": number;
      "by-synced": number;
    };
  };
}

export interface User {
  userId: string;
  email: string;
  plan: "free" | "premium";
  expiryDate: Date;
  username: string;
  createdAt: string;
  status: "active" | "suspended" | "deleted";
}

export interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  authToken: string | null;
  hasCompletedOnboarding: boolean;
  user: User | null;
}

export interface LogoutReason {
  MANUAL: string;
  INVALID_USER_DATA: string;
  FETCH_USER_FAILED: string;
  INVALID_USER_STRUCTURE: string;
}