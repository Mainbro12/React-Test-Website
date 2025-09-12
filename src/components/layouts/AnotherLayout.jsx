import { Box } from "@mui/material";
import { Outlet } from "react-router";

const AnotherLayout = () => (
  <>
    <header>
      <Box sx={{ border: "2px solid red", padding: "32px" }}>My header</Box>
    </header>
    <Outlet />
    <footer>
      {" "}
      <Box sx={{ border: "1px solid blue", padding: "50px" }}>My footer</Box>
    </footer>
  </>
);

export default AnotherLayout;
