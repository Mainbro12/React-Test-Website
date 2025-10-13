import {
  Box,
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router";
import useUser from "../../hooks/useUser";

export default function AboutPage() {
  const { user } = useUser();
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 2,
          boxShadow: 1,
          bgcolor: "background.paper",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, textAlign: "center" }}
        >
          About Us
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Welcome to <strong>Mercury </strong> — a place where ideas meet
          readers.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* English section */}
        <Typography variant="h5" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to <strong>Mercury Blog</strong> — a modern platform created
          for people who love to share their ideas, stories, and experiences
          with the world. Our mission is to give everyone a voice and make
          blogging simple, enjoyable, and inspiring.
        </Typography>

        <Typography variant="body1" paragraph>
          At Mercury, we believe that everyone has something valuable to say.
          Whether you’re a writer, a traveler, a photographer, or just someone
          who wants to express their thoughts — our platform gives you the tools
          to do it beautifully.
        </Typography>

        <Typography variant="body1" paragraph>
          We focus on creating a clean and user-friendly space where creativity
          meets technology. With our intuitive editor, category organization,
          and user profiles, you can easily create engaging posts and connect
          with readers who share your interests.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Our Values
        </Typography>
        <List>
          <ListItem sx={{ display: "list-item", pl: 2 }}>
            Inspiration — help others create.
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 2 }}>
            Respect — promote thoughtful and constructive discussion.
          </ListItem>
          <ListItem sx={{ display: "list-item", pl: 2 }}>
            Growth — support authors at any stage of their journey.
          </ListItem>
        </List>

        <Typography variant="body1" paragraph>
          We also care deeply about security and accessibility. Your data and
          content are protected, and our team continuously works to ensure a
          smooth and reliable experience for all users.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Divider sx={{ my: 3 }} />

        {/* CTA */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            component={Link}
            to="/add-article"
            variant="contained"
            size="large"
          >
            Start Blogging
          </Button>
          {user ? null : (
            <Button
              component={Link}
              to="/signup"
              variant="outlined"
              size="large"
            >
              Sign Up
            </Button>
          )}
        </Stack>

        <Typography
          variant="caption"
          display="block"
          sx={{ textAlign: "center", mt: 3 }}
        >
          Join our community today — share your story, inspire others, and
          become part of the Mercury Blog community.
        </Typography>
      </Box>
    </Container>
  );
}
