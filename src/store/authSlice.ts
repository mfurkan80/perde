import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../types/auth";

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      localStorage.setItem("token", action.payload.token);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      localStorage.removeItem("token");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, setUser, logout, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
