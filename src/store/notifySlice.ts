import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Notification } from "../types";
import { fetchNotifications } from "../api/auth/notify";
interface NotifyState {
  loading: boolean;
  error: string | null;
  data: Notification[];
}

const initialState: NotifyState = {
  loading: false,
  error: null,
  data: (await fetchNotifications()).filter(n => n.unread),
};

export const fetchNotificationsThunk = createAsyncThunk(
  "notify/fetchNotifications",
  async () => {
    const response = (await fetchNotifications()).filter(n => n.unread);
    return response;
  }
);

const notifySlice = createSlice({
  name: "notify",
  initialState,
  reducers: {
    setReadData(state, { payload }: { payload: number }) {
      state.data = state.data.map((item) =>
        item.id === payload ? { ...item, unread: false } : item
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotificationsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotificationsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notifications";
      });
  },
});
export const { setReadData } = notifySlice.actions;
export default notifySlice.reducer;