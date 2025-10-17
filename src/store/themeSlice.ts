import { createSlice } from '@reduxjs/toolkit';
type Mode = 'light' | 'dark';
const KEY = 'pref/theme-mode';
function getInitialMode(): Mode {
  const saved = localStorage.getItem(KEY) as Mode | null;
  if (saved === 'light' || saved === 'dark') return saved;
  // ตาม system preference
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: getInitialMode() as Mode },
  reducers: {
    toggleMode(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem(KEY, state.mode);
    },
    setMode(state, { payload }: { payload: Mode }) {
      state.mode = payload;
      localStorage.setItem(KEY, state.mode);
    }
  }
});
export const { toggleMode, setMode } = themeSlice.actions;
export default themeSlice.reducer;