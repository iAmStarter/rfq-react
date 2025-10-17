import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { logout } from "../store/authSlice";
import { useAppDispatch, type RootState } from "../store";
import { useEffect } from "react";
import { setPageTitle } from "../store/appSlice";
import DataGridDemo from "../components/DataGridDemo";

const HomePage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPageTitle("Home"));
  }, []);
  
  return (
    <>
      <Box sx={{ textAlign: "center", mb: 10 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the SCE Workflow!
        </Typography>
      </Box>

      <DataGridDemo />
    </>
  );
};
export default HomePage;
