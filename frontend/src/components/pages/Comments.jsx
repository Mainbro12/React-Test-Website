import { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import api from "../../api";

function CommentsPage() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await api.get("/comments");

      setComments(response.data);
    };
    fetchComments();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        User Comments:
      </Typography>
      <Grid container spacing={3}>
        {comments.map((comment, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {comment.name} {comment.lastname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📱 {comment.numberphone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📧 {comment.email}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 2, whiteSpace: "pre-line" }}
                >
                  {comment.message}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CommentsPage;
