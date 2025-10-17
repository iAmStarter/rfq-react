import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: 'app',
  initialState: { pageTitle: 'Home' },
  reducers: {
    setPageTitle(state, { payload }: { payload: string }) {
      state.pageTitle = payload;
    }
  }
});
export const { setPageTitle } = appSlice.actions;
export default appSlice.reducer;