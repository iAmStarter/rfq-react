import React from "react";
import UserManagement from "../features/Users/UserManagement";
import { Typography, Divider, Box } from "@mui/material";

export const UserManagementPage = () => {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 4, paddingLeft: 1 }}>
        User Management
      </Typography>
      <Box sx={{ marginTop: 2 }}>
        <UserManagement />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <UserManagement />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <UserManagement />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <UserManagement />
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <UserManagement />
      </Box>
    </>
  );
};
