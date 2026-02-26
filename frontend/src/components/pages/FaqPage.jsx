import { Box, Button, Typography } from "@mui/material";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import StyledLink from "../UI/StyledLink";

function FaqPage() {
  const location = useLocation();
  const isSubPage = location.pathname !== "/faq";
  const navigate = useNavigate();

  return (
    <Box p={3}>
      <Button
        sx={{ display: "flex", justifyContent: "flex-start" }}
        variant="contained"
        onClick={() => navigate(-1)}
      >
        ❮ Back
      </Button>

      {!isSubPage && (
        <>
          <Typography variant="h4" gutterBottom>
            FAQ
          </Typography>

          <Box sx={{ textAlign: "left", mt: 3 }}>
            <h1>Frequently Asked Questions:</h1>
            <h5>Click here ⬇️</h5>
            <StyledLink to="form-create-blog">
              1. How can I add my article to the site?
            </StyledLink>
            <p>
              🔸 Go to the “Add Article” section, fill in the title and text,
              then click “Publish.” Your article will appear after moderation.
            </p>
            <h4>2. Do I need an account to publish content?</h4>
            <p>
              🔸 Yes, to create articles or leave comments, you need to log in
              or register.
            </p>
            <h4>3. Can I add images to my articles?</h4>
            <p>
              🔸 Yes, when creating an article you can upload an image from your
              computer or insert an image URL.
            </p>
            <h4>4. Are there any blog submission rules?</h4>
            <p>Yes, of course, rules exist ⬇️</p>
            <StyledLink to="form-create-blog">
              Here are the blog submission rules.
            </StyledLink>

            <h4>5. I don’t see my article — what should I do?</h4>
            <p>
              🔸 It might still be under moderation or was rejected due to rule
              violations. Check your profile notifications.
            </p>
            <h4>6. How can I contact the administration?</h4>
            <p>🔸 Via the “Contact” page or by using the feedback form.</p>
            <h4>
              7. Can I contact the administration without registering or logging
              in?
            </h4>
            <p>🔸 Yes, of course ⬇️</p>
            <StyledLink to="/contact-form">Contact Form</StyledLink>
          </Box>
        </>
      )}

      <Outlet />
    </Box>
  );
}

export default FaqPage;
