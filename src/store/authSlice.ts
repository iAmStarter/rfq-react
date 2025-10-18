/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// src/store/authSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchUserProfile } from "../services/auth";
import type { User, UserLogin } from "../types";
interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  data:User | null;
}

const loadInitialState = async (): Promise<User | null> => {
  try {
    return await fetchUserProfile();
  } catch (e) {
    return null;
  }
};

const initialState: AuthState = {
  isAuthenticated: await loadInitialState() == null ? false : true,
  loading: false,
  error: null,
  data: await loadInitialState()
};

export const loginAsync = createAsyncThunk<
  User,
  UserLogin,
  { rejectValue: string }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const user = await fetchLogin(credentials);
    return user;
  } catch (error: any) {
    return rejectWithValue(error.message || "Login failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.error = null;
      sessionStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = null;
        state.data = action.payload;
        localStorage.setItem("user",JSON.stringify(action.payload));

      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Authentication failed";
        state.isAuthenticated = false;
      });
  },
});
export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
