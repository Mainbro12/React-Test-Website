import { Avatar } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api";

function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    avatar: null,
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      avatar: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", profileData.avatar);

    try {
      const res = await api.post("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status !== 200) {
        console.error("Server error", res.status);
        return;
      }
      const data = await res.data;
      setUser((prevUser) => ({ ...prevUser, avatar: data.user.avatar }));
    } catch (err) {
      console.error(err);
      alert("Помилка при завантаженні аватарки");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/33915743/pexels-photo-33915743.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0",
        borderRadius: "40px",
      }}
    >
      <h2 style={{ color: "white", textShadow: "0px 0px 5px black" }}>
        Завантажити Аватарку
      </h2>

      <Avatar
        alt="User Avatar"
        src={
          import.meta.env.VITE_SERVER_URL +
          user.avatar +
          "?timestamp=" +
          Date.now()
        }
        sx={{
          width: 300,
          height: 300,
          margin: "20px auto",
          border: "3px solid white",
          boxShadow: "0 0 15px rgba(0,0,0,0.5)",
        }}
      >
        {user.firstname[0].toUpperCase() + user.lastname[0].toUpperCase()}
      </Avatar>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Завантажити аватарку</button>
      </form>
    </div>
  );
}

export default ProfilePage;
