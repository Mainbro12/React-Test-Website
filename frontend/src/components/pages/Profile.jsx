import { Avatar } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useState } from "react";

function ProfilePage({ user, setUser }) {
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
    e.preventDefault(); //

    const formData = new FormData();
    formData.append("avatar", profileData.avatar);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/profile", {
        method: "POST",
        "Content-Type": "application/json",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.error("Server error", res.status);
        return;
      }

      const data = await res.json();
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
          "http://localhost:3000" + user.avatar + "?timeststamp=" + Date.now()
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
