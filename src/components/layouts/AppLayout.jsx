import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import ResponsiveAppBar from "../AppBar";
import Footer from "../Footer";

const AppLayout = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <ResponsiveAppBar user={props.user} />

      <Container
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
};

export default AppLayout;
