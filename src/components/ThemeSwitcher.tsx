import { IconButton, Tooltip } from '@mui/material';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import LightModeRounded from '@mui/icons-material/LightModeRounded';
import { useAppDispatch, useAppSelector } from '../store';
import { toggleMode } from '../store/themeSlice';
export default function ThemeSwitcher() {
  const mode = useAppSelector(s => s.theme.mode);
  const dispatch = useAppDispatch();
  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton onClick={() => dispatch(toggleMode())} size="large">
        {mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />} 
      </IconButton>
    </Tooltip>
  );
}