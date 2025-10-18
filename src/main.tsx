import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { store, useAppSelector } from './store';
import { buildTheme } from './styles/theme';
function ThemedApp() {
  const mode = useAppSelector(s => s.theme.mode);
  const theme = React.useMemo(() => buildTheme(mode), [mode]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  </React.StrictMode>
);