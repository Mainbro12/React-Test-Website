import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api";

function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/user/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  const avatarSrc = user.avatar
    ? import.meta.env.VITE_SERVER_URL + user.avatar
    : "";
  const backgroundSrc = user.background
    ? import.meta.env.VITE_SERVER_URL + user.background
    : "";

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 400,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: backgroundSrc
          ? `url(${backgroundSrc}) center/cover no-repeat`
          : "#b0b0b0",
        padding: 4,
        borderRadius: 4,
      }}
    >
      <Avatar
        alt={`${user.firstname} ${user.lastname}`}
        src={avatarSrc}
        sx={{ width: 200, height: 200, mb: 3 }}
      />
      <Typography variant="h5">
        {user.firstname} {user.lastname}
      </Typography>
      <br />
    </Box>
  );
}

export default UserProfilePage;
