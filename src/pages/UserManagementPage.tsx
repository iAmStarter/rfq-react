import React from "react";
import UserList from "../features/Users/UserList";
import { Typography, Box } from "@mui/material";

export const UserManagementPage = () => {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        User Management
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <UserList />
      </Box>

    </>
  );
};
