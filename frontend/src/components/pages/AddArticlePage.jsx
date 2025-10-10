import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import api from "../../api";
import MyEditor from "../UI/Editor";
import { slateToHtml } from "@slate-serializers/html";
import StyledLink from "../UI/StyledLink";

export default function AddArticlePage({ categories }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    content: [
      {
        type: "paragraph",
        children: [{ text: "Here you can write a veeeery long text!" }],
      },
    ],
    category_id: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const preparedFormData = {
        ...formData,
        content: slateToHtml(formData.content),
      };

      const response = await api.post("/article/create", preparedFormData);

      if (response.status === 200 || response.status === 201) {
        alert("Форма відправлена ✅");
        setFormData({
          title: "",
          description: "",
          image: "",
          content: [
            {
              type: "paragraph",
              children: [{ text: "" }],
            },
          ],
          category_id: "",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Помилка під час відправки форми ❌");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
      <Paper
        elevation={3}
        sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: 600 }}
      >
        <Typography variant="h5" mb={2} textAlign="center">
          Blog Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Img URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              fullWidth
              required
            />

            <FormControl fullWidth>
              <InputLabel id="categories">Category</InputLabel>
              <Select
                labelId="categories"
                id="categories"
                name="category_id"
                value={formData.category_id || ""}
                onChange={handleChange}
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <MyEditor value={formData.content} onChange={handleEditorChange} />
          </Stack>

          <Box mt={2}>
            <StyledLink to="/blog-submission-rules">
              Please read the blog submission rules.
            </StyledLink>
          </Box>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
