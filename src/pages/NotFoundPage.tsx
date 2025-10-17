// NotFoundPage.tsx
import * as React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      p={2}
    >
      <Typography variant="h1" component="h1" color="error" mb={2}>
        404
      </Typography>
      <Typography variant="h5" mb={3}>
        Page Not Found
      </Typography>
      <Typography variant="body1" mb={3} color="textSecondary">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate(-1)}
      >
        Go Back
      </Button>
      <Button 
        variant="text" 
        color="primary" 
        onClick={() => navigate('/')}
        sx={{ mt: 1 }}
      >
        Back to Home
      </Button>
    </Box>
  );
};