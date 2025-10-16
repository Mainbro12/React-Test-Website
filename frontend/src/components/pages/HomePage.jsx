import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Button,
} from "@mui/material";
import dayjs from "dayjs";
import api from "../../api";
import StyledLink from "../UI/StyledLink.jsx";
import {
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
} from "react-share";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, InputAdornment } from "@mui/material";

dayjs.locale("de");

function BlogPage() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter((article) =>
          article.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await api.get("/articles");
      const data = await response.data;
      setArticles(data);
      setFilteredArticles(data); // для пошуку
    };
    fetchBlogs();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 3,
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Blog with the Best!
          </Typography>

          <Button
            component={StyledLink}
            to="/add-article"
            variant="outlined"
            sx={{
              backgroundColor: "white",
              color: "#333",
              borderColor: "black",
              fontWeight: 500,
              textTransform: "none",
              padding: "10px 22px",
              borderRadius: "15px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              "&:hover": {
                backgroundColor: "#808080",
                boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
                borderColor: "black",
                transform: "translateY(-1px)",
                mb: "2px",
              },
            }}
          >
            Create a Blog!
          </Button>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
          <Typography variant="body1">To Share:</Typography>
          <FacebookShareButton
            url={window.location.href}
            quote="Check out this blog!"
          >
            <FacebookIcon size={30} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={window.location.href}
            title="Check out this blog!"
          >
            <TwitterIcon size={30} round />
          </TwitterShareButton>
          <TelegramShareButton
            url={window.location.href}
            title="Check out this blog!"
          >
            <TelegramIcon size={30} round />
          </TelegramShareButton>
        </Box>
      </Box>

      <TextField
        label="Search articles..."
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid
        container
        columns={{ xs: 1, sm: 4, md: 12, lg: 16 }}
        spacing={{ xs: 2, md: 3 }}
      >
        {filteredArticles.map((article, index) => (
          <Grid
            size={{ xs: 2, sm: 2, md: 4, lg: 4 }}
            width={"100%"}
            key={index}
          >
            <StyledLink to={`/article/${article.slug}`}>
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
                    <Typography
                      variant="body2"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {article.description}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 2 }}
                    >
                      {`👨🏻‍💻Author: ${article.user.firstname} ${article.user.lastname}`}
                      <br />
                      Posted on:
                      <Typography>
                        {dayjs(article.updatedAt).format("DD/MM/YYYY HH:mm")}
                      </Typography>
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            </StyledLink>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BlogPage;
