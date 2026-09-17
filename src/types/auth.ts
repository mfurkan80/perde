export interface User {
  id: number;
  email: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
