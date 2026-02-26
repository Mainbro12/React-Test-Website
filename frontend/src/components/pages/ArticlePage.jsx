import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../api";
import useUser from "../../hooks/useUser";
import dayjs from "dayjs";
import StyledLink from "../UI/StyledLink";

function ArticlePage() {
  const navigate = useNavigate();
  const params = useParams();

  const slug = params.slug;
  const [article, setArticle] = useState(null);
  const { user, userId } = useUser(); // залогований юзер поки лишаємо, не чіпаємо

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/article/${slug}`);
        const data = await response.data;
        setArticle(data);
      } catch (error) {
        if (error.response?.status === 404) {
          navigate("/");
        }
      }
    };

    fetchArticle();
  }, [slug, navigate]);

  // беремо автора із article
  const author = article?.user;
  const avatarSrc = author
    ? import.meta.env.VITE_SERVER_URL + author.avatar
    : "";

  return (
    <Container sx={{ py: 4 }}>
      <Button
        sx={{
          borderRadius: "12px",
          display: "flex",
          justifyContent: "flex-start",
          mt: -3,
        }}
        variant="contained"
        onClick={() => navigate(-1)}
      >
        ❮ Back
      </Button>
      <br />
      <br />
      {author && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            src={avatarSrc}
            alt={author.firstname || "Author"}
            variant="circular"
            sx={{
              width: 56,
              height: 56,
            }}
          />
          <Typography
            component={StyledLink}
            variant="h6"
            to={`/user/${author.id}`}
          >
            {author.firstname} {author.lastname}
          </Typography>
          {dayjs(article.updatedAt).format("DD/MM/YYYY HH:mm")}
        </Box>
      )}
      <div dangerouslySetInnerHTML={{ __html: article?.content }} />
    </Container>
  );
}

export default ArticlePage;
