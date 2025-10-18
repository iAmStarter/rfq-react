import React, { type FormEvent, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function UserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    console.log(values); // <- You get all form values here
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f6f7"
    >
      <Paper sx={{ p: 4, width: 400 }} elevation={3}>
        <Typography variant="h5" textAlign="center" mb={3}>
          Registration Form
        </Typography>

        {/* ✅ Native HTML form */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField label="First Name" name="firstName" required fullWidth />
            <TextField label="Last Name" name="lastName" required fullWidth />
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              fullWidth
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirm ? "text" : "password"}
              required
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)}>
                      {showConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* ✅ Native submit button */}
            <Button type="submit" variant="contained" size="large">
              Register
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
