import { useState } from "react";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import api from "../../api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    numberphone: "",
    email: "",
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/contact-form", formData);

    alert("Форма відправлена ✅");
    setFormData({
      name: "",
      lastname: "",
      numberphone: "",
      email: "",
      message: "",
    });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, width: 400, borderRadius: 3 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Contact Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Number Phone"
            name="numberphone"
            value={formData.numberphone}
            type="number"
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send form
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
