import {
  Avatar,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
import dayjs from "dayjs";
import StyledLink from "../UI/StyledLink";

function UserProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get(`/user/${id}`)
      .then((res) => setUser(res.data))
      .catch(console.error);
  }, [id]);

  if (!user) return <span>Loading...</span>;

  const avatarSrc = user.avatar
    ? import.meta.env.VITE_SERVER_URL + user.avatar
    : "";
  const backgroundSrc = user.background
    ? import.meta.env.VITE_SERVER_URL + user.background
    : "";

  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Button
        sx={{
          borderRadius: "12px",
          display: "flex",
          justifyContent: "flex-start",
          mt: -4,
        }}
        variant="contained"
        onClick={() => navigate(-1)}
      >
        ❮ Back
      </Button>
      <Box
        sx={{
          width: "100%",
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: backgroundSrc
            ? `url(${backgroundSrc}) center/cover no-repeat`
            : "#b0b0b0",
          padding: 4,
          borderRadius: 4,
          mb: 6,
        }}
      >
        <Avatar src={avatarSrc} sx={{ width: 200, height: 200, mb: 3 }} />
        <Typography variant="h5">
          {user.firstname} {user.lastname}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            mt: 1,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            color: "#f0f0f0",
            fontStyle: user.bio ? "normal" : "italic",
          }}
        >
          {user.bio || "No bio yet"}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {user.articles?.length ? (
          [...user.articles]
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .map((article) => (
              <Box key={article.id} sx={{ flex: "1 0 calc(16.66% - 8px)" }}>
                <StyledLink
                  to={`/article/${article.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 3,
                      boxShadow: 3,
                    }}
                  >
                    {article.image && (
                      <CardMedia
                        component="img"
                        height="150"
                        image={article.image}
                        alt={article.title}
                        sx={{ objectFit: "cover" }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1, py: 1 }}>
                      <Typography
                        variant="subtitle1"
                        gutterBottom
                        noWrap
                        component="div"
                      >
                        {article.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {article.description}
                      </Typography>
                      <Typography
                        variant="caption"
                        component="div"
                        color="text.secondary"
                        sx={{ mt: 1, display: "block" }}
                      >
                        {article.user?.firstname} {article.user?.lastname}
                        <br />
                        {dayjs(article.updatedAt).format("DD/MM/YYYY HH:mm")}
                      </Typography>
                    </CardContent>
                  </Card>
                </StyledLink>
              </Box>
            ))
        ) : (
          <Typography variant="body2" component="div">
            This user has no articles yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default UserProfilePage;
