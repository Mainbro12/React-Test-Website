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
import { Link } from "react-router";

dayjs.locale("de");

function BlogPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await api.get("/articles");
      const data = await response.data;
      setArticles(data);
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
        {articles.map((article, index) => (
          <Grid
            size={{ xs: 2, sm: 2, md: 4, lg: 4 }}
            width={"100%"}
            key={index}
          >
            <Link to={`/article/${article.slug}`}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {article.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.image}
                    alt={article.title}
                    sx={{ objectFit: "cover" }}
                  />
                )}

                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {article.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ mt: 1, whiteSpace: "pre-line" }}
                  >
                    {article.description}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      {`👨🏻‍💻Author: ${article.user.firstname} ${article.user.lastname}`}
                      <br />
                      Posted on:
                      {dayjs(article.created_at).format("DD/MM/YYYY HH:mm")}
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BlogPage;
