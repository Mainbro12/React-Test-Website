import {
  Avatar,
  Box,
  Button,
  Typography,
  IconButton,
  TextField,
} from "@mui/material";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router";

function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const [profileUser, setProfileUser] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [previewBackground, setPreviewBackground] = useState("");
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);

  const backgroundInputRef = useRef(null);
  const avatarInputRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      api.get(`/user/${id}`).then((res) => setProfileUser(res.data));
    } else {
      setProfileUser(user);
    }
  }, [id, user]);

  useEffect(() => {
    setPreviewAvatar(
      user.avatar
        ? import.meta.env.VITE_SERVER_URL + user.avatar + "?t=" + Date.now()
        : ""
    );
    setPreviewBackground(
      user.background ? import.meta.env.VITE_SERVER_URL + user.background : ""
    );
    setBio(user.bio || "");
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

  // 🔹 Зберігає аватар + background + bio
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatarFile) formData.append("avatar", avatarFile);
    if (backgroundFile) formData.append("background", backgroundFile);
    if (bio) formData.append("bio", bio);

    try {
      const res = await api.post("/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data.user);
      setAvatarFile(null);
      setBackgroundFile(null);
      setEditingBio(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  // 🔹 Зберігає лише аватар + background, але залишає поточне bio
  const handleUploadImages = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (avatarFile) formData.append("avatar", avatarFile);
    if (backgroundFile) formData.append("background", backgroundFile);
    // 👇 додаємо поточне bio, щоб не стерлось
    if (bio) formData.append("bio", bio);

    try {
      const res = await api.post("/profile/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUser(res.data.user);
      setAvatarFile(null);
      setBackgroundFile(null);
      alert("Profile updated successfully!");
      window.location.reload();
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
          : "#b0b0b0",
        padding: 4,
        borderRadius: 4,
      }}
    >
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
          alt={`${profileUser?.firstname} ${profileUser?.lastname}`}
          src={previewAvatar}
          sx={{
            width: 200,
            height: 200,
            border: "3px solid white",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          }}
        >
          {profileUser?.firstname?.[0]?.toUpperCase() +
            profileUser?.lastname?.[0]?.toUpperCase()}
        </Avatar>

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
        onSubmit={handleUploadImages}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        <Button type="submit" variant="contained" color="primary">
          Update Profile
        </Button>
      </form>

      {/* BIO SECTION */}
      <Box
        sx={{
          mt: 2,
          width: "100%",
          maxWidth: 600,
          bgcolor: "#4a4a4a",
          borderRadius: 2,
          p: 2,
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Bio:
        </Typography>

        {!editingBio ? (
          <>
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-line",
                color: "#f0f0f0",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                fontStyle: user.bio ? "normal" : "italic",
              }}
            >
              {user.bio || "No bio yet"}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
              onClick={() => setEditingBio(true)}
            >
              Edit Bio
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="About me"
              multiline
              rows={4}
              fullWidth
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              onClick={handleUpload}
            >
              Save Bio
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}

export default ProfilePage;
