import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
} from "@mui/material";
import dayjs from "dayjs";
import api from "../../api";

dayjs.locale("de");

function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await api.get("/blog");
      const data = await response.data;
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Blog Articles:
      </Typography>
      <Grid
        container
        columns={{ xs: 1, sm: 4, md: 12, lg: 16 }}
        spacing={{ xs: 2, md: 3 }}
      >
        {blogs.map((blog, index) => (
          <Grid
            size={{ xs: 2, sm: 2, md: 4, lg: 4 }}
            width={"100%"}
            key={index}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {blog.image && (
                <CardMedia
                  component="img"
                  height="200"
                  image={blog.image}
                  alt={blog.title}
                  sx={{ objectFit: "cover" }}
                />
              )}

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {blog.title}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 1, whiteSpace: "pre-line" }}
                >
                  {blog.description}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 2 }}
                  >
                    {`👨🏻‍💻Author: ${blog.user.firstname} ${blog.user.lastname}`}
                    <br />
                    Posted on:
                    {dayjs(blog.created_at).format("DD/MM/YYYY HH:mm")}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BlogPage;
