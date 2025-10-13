import { Avatar, Box, Button, Typography, IconButton } from "@mui/material";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api";
import AddIcon from "@mui/icons-material/Add";

function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const [avatarFile, setAvatarFile] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [previewBackground, setPreviewBackground] = useState("");

  const backgroundInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  useEffect(() => {
    setPreviewAvatar(
      user.avatar
        ? import.meta.env.VITE_SERVER_URL + user.avatar + "?t=" + Date.now()
        : ""
    );
    setPreviewBackground(
      user.background ? import.meta.env.VITE_SERVER_URL + user.background : ""
    );
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) setPreviewAvatar(URL.createObjectURL(file));
  };

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    setBackgroundFile(file);
    if (file) setPreviewBackground(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatarFile) formData.append("avatar", avatarFile);
    if (backgroundFile) formData.append("background", backgroundFile);

    try {
      const res = await api.post("/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data.user);
      setAvatarFile(null);
      setBackgroundFile(null);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: 400,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: previewBackground
          ? `url(${previewBackground}) center/cover no-repeat`
          : "#b0b0b0", // default grey color
        padding: 4,
        borderRadius: 4,
      }}
    >
      {/* Change background button */}
      <Button
        variant="contained"
        size="small"
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          bgcolor: "rgba(0,0,0,0.6)",
          color: "white",
          "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
        }}
        onClick={() => backgroundInputRef.current.click()}
      >
        Change background
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={backgroundInputRef}
        onChange={handleBackgroundChange}
        style={{ display: "none" }}
      />

      <Typography
        variant="h4"
        sx={{ mb: 3, color: "white", textShadow: "0 0 5px black" }}
      >
        Profile
      </Typography>

      <Box sx={{ position: "relative", mb: 3 }}>
        <Avatar
          alt={`${user.firstname} ${user.lastname}`}
          src={previewAvatar}
          sx={{
            width: 200,
            height: 200,
            border: "3px solid white",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        >
          {user.firstname[0].toUpperCase() + user.lastname[0].toUpperCase()}
        </Avatar>

        {/* "+" button on avatar */}
        <IconButton
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            bgcolor: "rgba(255,255,255,0.8)",
            "&:hover": { bgcolor: "white" },
          }}
          onClick={() => avatarInputRef.current.click()}
        >
          <AddIcon />
        </IconButton>

        <input
          type="file"
          accept="image/*"
          ref={avatarInputRef}
          onChange={handleAvatarChange}
          style={{ display: "none" }}
        />
      </Box>

      <form
        onSubmit={handleUpload}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <Button type="submit" variant="contained" color="primary">
          Update Profile
        </Button>
      </form>
    </Box>
  );
}

export default ProfilePage;
