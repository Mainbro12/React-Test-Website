import { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import api from "../../api";
import MyEditor from "../UI/Editor";
import { slateToHtml } from "@slate-serializers/html";

export default function BlogCreate() {
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    content: [
      {
        type: "paragraph",
        children: [
          {
            text: "Here you can write a veeeery long text!",
          },
          { text: "", bold: true },
          {
            text: "",
          },
        ],
      },
    ],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditorChange = (value) => {
    const content = {
      target: {
        name: "content",
        value,
      },
    };

    handleChange(content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const preparedFormData = {
        ...formData,
        content: slateToHtml(formData.content),
      };

      const response = await api.post("/article/create", preparedFormData);
      if (response.ok) {
        alert("Форма відправлена ✅");
        setFormData({
          title: "",
          image: "",
          description: "",
          content: [],
        });
      }
    } catch (err) {
      console.log(err);
      alert("Помилка під час відправки форми ❌");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
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
          <MyEditor value={formData.content} onChange={handleEditorChange} />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
