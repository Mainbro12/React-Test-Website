import { useNavigate } from "react-router";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
const AuthProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  const [token, setToken] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          import.meta.env.VITE_SERVER_URL + "/verify-token",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { user } = await res.json();
        setUser(user);
        setToken(token);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // видаляємо токен
    // опціонально – очистити стейт користувача
    setUser(null);
    // і перенаправити на логін
    navigate("/signin");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically
          height: "100vh", // Example: make the Box fill the viewport height
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user: props.user, setUser: props.setUser, token, handleLogout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
