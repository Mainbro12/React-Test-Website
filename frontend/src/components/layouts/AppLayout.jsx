import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router";
import ResponsiveAppBar from "../AppBar";
import Footer from "../Footer";

const AppLayout = ({ isUseContainer = true, categories }) => {
  const muiTheme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <ResponsiveAppBar categories={categories} />
        {isUseContainer ? (
          <Container
            component="main"
            sx={{
              flexGrow: 1,
              py: 4,
            }}
          >
            <Outlet />
          </Container>
        ) : (
          <Outlet />
        )}

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default AppLayout;
