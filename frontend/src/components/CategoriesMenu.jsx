import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography, useMediaQuery, useTheme } from "@mui/material";

export default function CategoriesMenu({ categories }) {
  const [anchorCategories, setAnchorCategories] = React.useState(null); // стан для відкриття меню
  const open = Boolean(anchorCategories); // true, якщо меню відкрите
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (event) => {
    setAnchorCategories(event.currentTarget); // відкриваємо меню під кнопкою
  };
  const handleClose = () => {
    setAnchorCategories(null); // закриваємо меню
  };

  const renderMenuButton = () => {
    const defaultParams = {
      id: "category-button",
      "aria-controls": open ? "category-menu" : undefined,
      "aria-haspopup": true,
      "aria-expanded": open ? "true" : undefined,
      onClick: handleClick,
    };

    if (isMobile) {
      return (
        <Typography
          {...defaultParams}
          variant="button"
          sx={{ color: "white", textTransform: "uppercase" }} // стилі кнопки
        >
          Categories
        </Typography>
      );
    }

    return (
      <Button
        {...defaultParams}
        id="category-button"
        variant="text"
        sx={{ color: "white" }} // стилі кнопки
      >
        Categories
      </Button>
    );
  };

  return (
    <>
      {renderMenuButton()}

      <Menu
        id="category-menu"
        anchorEl={anchorCategories} // прив'язка меню до кнопки
        open={open} // чи відкрите меню
        onClose={handleClose} // закриття меню
        slotProps={{
          list: {
            "aria-labelledby": "category-button", // доступність
          },
        }}
      >
        {categories?.map((category) => (
          <MenuItem
            key={category.id} // унікальний ключ для React
            onClick={() => {
              handleClose(); // закриваємо меню
              window.location.href = `/category/${category.slug}`; // переходимо на сторінку категорії
            }}
            sx={{ color: "text.primary" }} // колір тексту
          >
            {category.name} {/* назва категорії */}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
