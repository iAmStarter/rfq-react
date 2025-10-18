import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { loginAsync, clearError } from "../../store/authSlice";
import type { RootState, AppDispatch } from "../../store";
import CustomTextField from "../common/CustomTextField";
type LocationState = { from?: { pathname: string } } | null;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as LocationState)?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);



  const handleUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
      if (usernameError) setUsernameError(false);
      if (error) dispatch(clearError()); 
    },
    [usernameError, error, dispatch]
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (passwordError) setPasswordError(false);
      if (error) dispatch(clearError());
    },
    [passwordError, error, dispatch]
  );

  const validate = useCallback(() => {
    const uErr = username.trim() === "";
    const pErr = password.length < 6;
    setUsernameError(uErr);
    setPasswordError(pErr);
    return !(uErr || pErr);
  }, [username, password]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      await dispatch(loginAsync({ username: username.trim(), password }));
    },
    [dispatch, username, password, validate]
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          p: 3,
          width: "100%",
          maxWidth: 400,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        {error && (
          <Alert severity="error" onClose={() => dispatch(clearError())}>
            {error}
          </Alert>
        )}
        <CustomTextField 
          value={username}
          handleChange={handleUsernameChange}
          error={usernameError}
          setError={setUsernameError}
          loading={loading}
          helperText={usernameError ? "Please enter your username" : " "}
          autoComplete="username"
          label="Username"
        />
        <CustomTextField 
          value={password}
          handleChange={handlePasswordChange}
          error={passwordError}
          setError={setPasswordError}
          loading={loading}
          helperText={passwordError ? "Please enter your password" : " "}
          autoComplete="current-password"
          label="Password"
          isPassword
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 1 }}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </Box>
    </Box>
  );
};
export default Login;
