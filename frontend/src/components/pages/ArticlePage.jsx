import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../../api";

function ArticlePage() {
  const navigate = useNavigate();
  let params = useParams();

  const slug = params.slug;
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(`/article/${slug}`);
        const data = await response.data;

        setArticle(data);
      } catch (error) {
        if (error.response.status === 404) {
          return navigate("/");
        }

        return null;
      }
    };
    fetchArticle();
  }, []);

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: article?.content }} />
    </Container>
  );
}

export default ArticlePage;
