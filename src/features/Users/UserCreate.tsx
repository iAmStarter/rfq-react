import React from "react";

interface UserCreateProps {
  open: boolean;
  onClose: () => void;
}

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export default function UserCreate({ open, onClose }: UserCreateProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        {/* User creation form goes here */}
        <div style={{ marginTop: 8 }}>
          {/* Example fields: */}
          <input type="text" placeholder="First Name" style={{ marginBottom: 8, width: '100%' }} />
          <input type="text" placeholder="Last Name" style={{ marginBottom: 8, width: '100%' }} />
          <input type="number" placeholder="Age" style={{ marginBottom: 8, width: '100%' }} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary">Create</Button>
      </DialogActions>
    </Dialog>
  );
}
