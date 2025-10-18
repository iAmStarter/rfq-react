// CommonTextField.tsx
import React, { useState } from 'react';
import {
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
  type OutlinedInputProps,
  type FormControlProps,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface CommonTextFieldProps extends Omit<OutlinedInputProps, 'type' | 'value' | 'onChange' | 'endAdornment' | 'startAdornment'> {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const CommonTextField: React.FC<CommonTextFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  className = '',
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';
  const inputType = isPasswordField && showPassword ? 'text' : type;

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl
      variant="outlined"
      fullWidth
      error={!!error}
      disabled={disabled}
      required={required}
      className={className}
      sx={{ mb: 2 }}
      {...rest as FormControlProps} // Pass remaining props to FormControl
    >
      <InputLabel>{label}</InputLabel>
      <OutlinedInput
        value={value}
        onChange={onChange}
        type={inputType}
        placeholder={placeholder}
        endAdornment={
          isPasswordField ? (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
        label={label}
      />
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};

export default CommonTextField;