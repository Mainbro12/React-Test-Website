import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import ToggleThemeBtn from "./UI/ThemeToggleBtn";
import CategoriesMenu from "./CategoriesMenu";

function ResponsiveAppBar({ categories }) {
  const { user, handleLogout } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const handleSettingsClick = (action) => {
    handleCloseUserMenu();
    action();
  };

  const leftLinks = [
    { title: "Contact", link: "/contact-form" },
    { title: "Add Article", link: "/add-article" },
    { title: "Add Category", link: "/add-category" },
  ];

  const settings = [
    { title: "Profile", action: () => navigate("/profile") },
    { title: "Logout", action: () => handleLogout() },
  ];

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
            }}
          >
            Mercury
          </Typography>

          {/* Мобільне меню */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              {leftLinks.map((page) => (
                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={page.link}
                    sx={{
                      textAlign: "center",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
              <CategoriesMenu categories={categories} />
            </Menu>
          </Box>
          <CategoriesMenu categories={categories} />
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}
          >
            {leftLinks.map((page) => (
              <Button
                key={page.title}
                component={Link}
                to={page.link}
                sx={{ my: 2, color: "white" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Кнопки користувача */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5 }}>
            {!user && (
              <>
                <Button component={Link} to="/signin" sx={{ color: "white" }}>
                  Sign In
                </Button>
                <Button component={Link} to="/signup" sx={{ color: "white" }}>
                  Sign Up
                </Button>
              </>
            )}
            {user && (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src={import.meta.env.VITE_SERVER_URL + user.avatar}>
                      {user.firstname[0].toUpperCase() +
                        user.lastname[0].toUpperCase()}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  sx={{ mt: "45px" }}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.title}
                      onClick={() => handleSettingsClick(setting.action)}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
            <ToggleThemeBtn />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
