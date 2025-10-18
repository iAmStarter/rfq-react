import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { loginAsync, clearError } from "../../store/authSlice";
import type { RootState, AppDispatch } from "../../store";
import CustomTextField from "../common/CustomTextField";

type LocationState = { from?: { pathname: string } } | null;

type FormValues = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    control,
    handleSubmit,
    setError: setFormError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { username: "", password: "" },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  React.useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  React.useEffect(() => {
    if (isAuthenticated) {
      const from = (location.state as LocationState)?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location.state]);

  const onSubmit = async (data: FormValues) => {
    await dispatch(loginAsync({ username: data.username.trim(), password: data.password }));
  };

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
        onSubmit={handleSubmit(onSubmit)}
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

        <Controller
          name="username"
          control={control}
          rules={{ required: "Please enter your username" }}
          render={({ field }) => (
            <CustomTextField
              value={field.value}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(clearError());
                field.onChange(e);
                if (errors.username) clearErrors("username");
              }}
              error={!!errors.username}
              setError={(v: boolean) =>
                v
                  ? setFormError("username", {
                      type: "manual",
                      message: "Please enter your username",
                    })
                  : clearErrors("username")
              }
              loading={loading}
              helperText={errors.username?.message || " "}
              autoComplete="username"
              label="Username"
              name="username"
              required
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{
            required: "Please enter your password",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          }}
          render={({ field }) => (
            <CustomTextField
              value={field.value}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(clearError());
                field.onChange(e);
                if (errors.password) clearErrors("password");
              }}
              error={!!errors.password}
              setError={(v: boolean) =>
                v
                  ? setFormError("password", {
                      type: "manual",
                      message: "Please enter your password",
                    })
                  : clearErrors("password")
              }
              loading={loading}
              helperText={errors.password?.message || " "}
              autoComplete="current-password"
              label="Password"
              isPassword
              name="password"
              required
            />
          )}
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
