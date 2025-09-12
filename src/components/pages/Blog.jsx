import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
} from "@mui/material";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:3000/blog");
      const data = await response.json();
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
        columns={{ xs: 1, sm: 4, md: 12, lg: 15 }}
        spacing={{ xs: 2, md: 3 }}
      >
        {blogs.map((blog, index) => (
          <Grid
            size={{ xs: 2, sm: 2, md: 4, lg: 3 }}
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
