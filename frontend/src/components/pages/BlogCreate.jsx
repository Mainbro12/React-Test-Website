import { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

export default function BlogCreate() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3000/blog/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Форма відправлена ✅");
        }
        setFormData({
          title: "",
          image: "",
          description: "",
        });
        return response.json();
      })
      .catch((error) => {
        console.log(error);
        alert("Помилка під час відправки форми ❌");
      });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Blog Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Img URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
