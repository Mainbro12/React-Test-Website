import * as React from "react";
import AppBar from "@mui/material/AppBar"; // верхня панель
import Box from "@mui/material/Box"; // контейнер для layout
import Toolbar from "@mui/material/Toolbar"; // toolbar всередині AppBar
import IconButton from "@mui/material/IconButton"; // кнопка для іконок
import Typography from "@mui/material/Typography"; // текст
import Menu from "@mui/material/Menu"; // меню
import MenuIcon from "@mui/icons-material/Menu"; // іконка "гамбургер"
import Container from "@mui/material/Container"; // контейнер з відступами
import Avatar from "@mui/material/Avatar"; // аватар користувача
import Button from "@mui/material/Button"; // кнопка
import Tooltip from "@mui/material/Tooltip"; // підказка
import MenuItem from "@mui/material/MenuItem"; // пункт меню
import { Link } from "react-router"; // для переходів
import { useNavigate } from "react-router"; // програмна навігація
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // авторизація
import ToggleThemeBtn from "./UI/ThemeToggleBtn"; // кнопка перемикання теми
import CategoriesMenu from "./CategoriesMenu"; // меню категорій

function ResponsiveAppBar({ categories }) {
  const { user, handleLogout } = useContext(AuthContext); // користувач і вихід
  const [anchorElNav, setAnchorElNav] = React.useState(null); // стан меню навігації (мобільне)
  const [anchorElUser, setAnchorElUser] = React.useState(null); // стан меню користувача
  const navigate = useNavigate(); // для програмної навігації

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget); // відкрити мобільне меню
  const handleCloseNavMenu = () => setAnchorElNav(null); // закрити мобільне меню
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget); // відкрити меню користувача
  const handleCloseUserMenu = () => setAnchorElUser(null); // закрити меню користувача
  const handleSettingsClick = (action) => {
    handleCloseUserMenu(); // закриваємо меню
    action(); // виконуємо дію (профіль або вихід)
  };

  const leftLinks = [
    { title: "Contact", link: "/contact-form" }, // посилання зліва
    { title: "Add Article", link: "/add-article" },
    { title: "Add Category", link: "/add-category" },
    { title: "FAQ", link: "/faqs" },
    { title: "Blog Rules", link: "/blog-submission-rules" },
  ];

  const settings = [
    { title: "Profile", action: () => navigate("/profile") }, // дії в меню користувача
    { title: "Logout", action: () => handleLogout() },
  ];

  return (
    <AppBar position="sticky">
      {" "}
      {/* фіксована верхня панель */}
      <Container>
        <Toolbar disableGutters>
          {/* Лого */}
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
              onClick={handleOpenNavMenu} // відкриваємо меню
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav} // прив'язка до кнопки
              open={Boolean(anchorElNav)} // чи відкрите
              onClose={handleCloseNavMenu} // закриття
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              PaperProps={{
                sx: {
                  "& .MuiMenuItem-root": {
                    mb: 1,
                  },
                },
              }}
            >
              {leftLinks.map((page) => (
                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                  <Typography
                    variant="button"
                    component={Link}
                    to={page.link} // перехід по кліку
                    sx={{
                      textAlign: "center",
                      textTransform: "uppercase",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
              <MenuItem>
                <CategoriesMenu categories={categories} />
              </MenuItem>
              {/* мобільне меню категорій */}
            </Menu>
          </Box>

          {/* Десктопне меню категорій */}

          {/* Посилання зліва для десктопа */}
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 1 }}
          >
            {leftLinks.map((page) => (
              <Button
                key={page.title}
                component={Link}
                to={page.link} // перехід
                sx={{ color: "white" }}
              >
                {page.title}
              </Button>
            ))}
            <CategoriesMenu categories={categories} />
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
                  anchorEl={anchorElUser} // меню користувача
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
                        {setting.title} {/* Профіль або Вихід */}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
            <ToggleThemeBtn /> {/* кнопка зміни теми */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
