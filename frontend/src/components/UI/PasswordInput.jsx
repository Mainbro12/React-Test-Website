import { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import EyeClosedIcon from "./svg-icons/EyeClosedIcon";

function PasswordInput(props) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? "hide the password" : "display the password"
                }
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                sx={{ marginRight: 0.1 }}
                edge="end"
              >
                {!showPassword ? <EyeClosedIcon /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

export default PasswordInput;
