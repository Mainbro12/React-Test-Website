import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../api";
import dayjs from "dayjs";
import StyledLink from "../UI/StyledLink";

function CategoryPage() {
  const navigate = useNavigate();
  let params = useParams();

  const slug = params.slug;
  const [category, setCategory] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/category/${slug}`);
        const data = await response.data;
        setCategory(data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 404) {
          return navigate("/");
        }
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 200, md: 400 },
          backgroundImage: `url(${category.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
          mb: 4,
        }}
      >
        {/* Gray overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.5)",
          }}
        />

        {/* Category name centered */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            zIndex: 1,
          }}
        >
          <Typography
            sx={{ typography: { xs: "h4", md: "h3" } }}
            fontWeight="bold"
          >
            {category.name}
          </Typography>
        </Box>
      </Box>
      <Container>
        <Grid
          container
          pb={6}
          columns={{ xs: 1, sm: 4, md: 12, lg: 16 }}
          spacing={{ xs: 2, md: 3 }}
        >
          {category.articles.map((article, index) => (
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
                      variant="body1"
                      sx={{ mt: 1, whiteSpace: "pre-line" }}
                    >
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
              </StyledLink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default CategoryPage;
