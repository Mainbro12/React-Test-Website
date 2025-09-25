import { Avatar } from "@mui/material";
import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api";

function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    avatar: null, // тут зберігатиметься файл
  });

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      avatar: e.target.files[0],
    });
  };

  // Відправка аватарки на сервер
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
    <div>
      <h2>Завантажити Аватарку:</h2>
      <Avatar
        alt="Remy Sharp"
        src={
          import.meta.env.VITE_SERVER_URL +
          user.avatar +
          "?timeststamp=" +
          Date.now()
        }
        sx={{
          width: 200,
          height: 200,
          margin: "auto",
          marginY: 6,
          padding: 2,
          border: "1px solid lightgrey",
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
