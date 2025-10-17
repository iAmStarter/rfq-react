import { Visibility, VisibilityOff } from "@mui/icons-material";
import { 
  FormControl, 
  InputLabel, 
  OutlinedInput, 
  InputAdornment, 
  IconButton, 
  FormHelperText,
  type OutlinedInputProps
} from "@mui/material";
import React, { useState } from "react";

interface CustomTextFieldProps extends Omit<OutlinedInputProps, 'value' | 'onChange' | 'error' | 'helperText'> {
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  setError?: (error: boolean) => void;
  loading?: boolean;
  helperText?: string;
  autoComplete?: string;
  label?: string;
  isPassword?: boolean;
  minPassword?: number;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  value,
  handleChange,
  error = false,
  setError,
  loading = false,
  helperText,
  autoComplete,
  label = "Field",
  isPassword = false,
  minPassword = 6,
  ...inputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlePasswordBlur = () => {
    if (setError) {
      setError(value.length < minPassword);
    }
  };

  const handleTextBlur = () => {
    if (setError) {
      setError(value.trim() === "");
    }
  };

  const isPasswordField = isPassword;
  const currentLabel = label || (isPasswordField ? "Password" : "Field");

  return (
    <FormControl
      variant="outlined"
      error={error}
      fullWidth
      required
      disabled={loading}
      {...inputProps}
    >
      <InputLabel htmlFor={isPasswordField ? "password" : undefined}>
        {currentLabel}
      </InputLabel>
      
      <OutlinedInput
        id={isPasswordField ? "password" : undefined}
        type={isPasswordField && showPassword ? "text" : (isPasswordField ? "password" : inputProps.type)}
        value={value}
        onChange={handleChange}
        onBlur={isPasswordField ? handlePasswordBlur : handleTextBlur}
        label={currentLabel}
        autoComplete={isPasswordField ? autoComplete || "current-password" : autoComplete}
        endAdornment={
          isPasswordField && (
            <InputAdornment position="end">
              <IconButton
                aria-label={showPassword ? "hide password" : "show password"}
                onClick={handleTogglePasswordVisibility}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                disabled={loading}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }
        inputProps={{
          "aria-describedby": isPasswordField ? "password-helper-text" : undefined,
          ...inputProps.inputProps
        }}
      />
      
      <FormHelperText id={isPasswordField ? "password-helper-text" : undefined}>
        {error
          ? isPasswordField
            ? `Password must be at least ${minPassword} characters`
            : helperText || " "
          : " "}
      </FormHelperText>
    </FormControl>
  );
};

export default CustomTextField;