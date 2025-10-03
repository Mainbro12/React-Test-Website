import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function CategoriesMenu({ categories }) {
  const [anchorCategories, setAnchorCategories] = React.useState(null);
  const open = Boolean(anchorCategories);
  const handleClick = (event) => {
    setAnchorCategories(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorCategories(null);
  };

  return (
    <>
      <Button
        id="category-button"
        aria-controls={open ? "category-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ my: 2, color: "white" }}
      >
        Categories
      </Button>
      <Menu
        id="category-menu"
        anchorEl={anchorCategories}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "category-button",
          },
        }}
      >
        {categories?.map((category) => (
          <MenuItem
            key={category.id}
            onClick={() => {
              handleClose();
              window.location.href = `/category/${category.slug}`; // повне оновлення сторінки
            }}
            sx={{ color: "text.primary" }}
          >
            {category.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
