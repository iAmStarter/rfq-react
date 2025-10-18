import { Box, Typography } from "@mui/material";
import DataGridDemo from "../components/DataGridDemo";

const HomePage = () => {

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
