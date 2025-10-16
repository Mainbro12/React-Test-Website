import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import api from "../../api";

export default function AddCategoryPage() {
  const [formData, setFormData] = useState({
    name: "",
    img: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const preparedFormData = {
        ...formData,
      };

      const response = await api.post("/category/create", preparedFormData);
      if (response.status === 200) {
        alert("Category created ✅");
        setFormData({
          name: "",
          img: "",
        });
      }
    } catch (err) {
      console.log(err);
      alert("Error while creating category ❌");
    }
    setFormData({ name: "", img: "" });

    window.location.reload();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" mb={2} textAlign="center">
          Add Category:
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Img URL"
              name="img"
              value={formData.img}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
          </Stack>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit Category
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
