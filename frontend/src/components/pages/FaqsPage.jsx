import { Box } from "@mui/material";
import StyledLink from "../UI/StyledLink";

function FaqsPage() {
  return (
    <Box sx={{ textAlign: "left" }}>
      <h1>frequently asked questions:</h1>
      <h5>Click here ⬇️</h5>
      <StyledLink to="/form-create-blog">
        1. How can I add my article to the site?
      </StyledLink>
      <p>
        🔸 Go to the “Add Article” section, fill in the title and text, then
        click “Publish.” Your article will appear after moderation.
      </p>
      <h4>2. Do I need an account to publish content?</h4>
      <p>
        🔸 Yes, to create articles or leave comments, you need to log in or
        register.
      </p>
      <h4>4. Can I add images to my articles?</h4>
      <p>
        🔸 Yes, when creating an article you can upload an image from your
        computer or insert an image URL.
      </p>
      <h4>5. I don’t see my article — what should I do?</h4>
      <p>
        🔸 It might still be under moderation or was rejected due to rule
        violations. Check your profile notifications.
      </p>
      <h4>6. How can I contact the administration?</h4>
      <p>🔸 Via the “Contact” page or by using the feedback form.</p>
      <h4>
        7. Can I contact the administration without registering or logging in?
      </h4>
      <p> 🔸 Yes, of course ⬇️</p>{" "}
      <StyledLink to="/contact-form">Contact Form</StyledLink>
    </Box>
  );
}

export default FaqsPage;
