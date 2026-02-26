import { Box, Typography, List, ListItem, Divider } from "@mui/material";
import StyledLink from "../UI/StyledLink";

function FormCreateBlogPage() {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3, textAlign: "left" }}>
      <Typography variant="h4" gutterBottom>
        How to Create Your Blog
      </Typography>
      <br />

      <Typography variant="body1" gutterBottom>
        Follow these steps to create and publish your blog. Each step is
        explained clearly to make the process easy for you.
      </Typography>
      <br />

      <List>
        <ListItem sx={{ display: "block", mb: 1 }}>
          <Typography variant="h6">● Step 1: Title</Typography>
          <Typography variant="body1">
            Fill in the <strong>"Title"</strong> field with the name of your
            blog. Make sure it is catchy and reflects the content of your blog.
          </Typography>
        </ListItem>
        <Typography sx={{ textAlign: "center", mb: 2 }}>⬇️</Typography>
        <Divider sx={{ mb: 2 }} />

        <ListItem sx={{ display: "block", mb: 1 }}>
          <Typography variant="h6">● Step 2: Description</Typography>
          <Typography variant="body1">
            Fill in the <strong>"Description"</strong> field. Write a short
            summary (maximum 3 lines) describing what your blog is about.
          </Typography>
        </ListItem>
        <Typography sx={{ textAlign: "center", mb: 2 }}>⬇️</Typography>
        <Divider sx={{ mb: 2 }} />

        <ListItem sx={{ display: "block", mb: 1 }}>
          <Typography variant="h6">● Step 3: Blog Image</Typography>
          <Typography variant="body1">
            In the <strong>"Img URL"</strong> field, insert the link to your
            main blog image. This image will be displayed as the cover image.
          </Typography>
        </ListItem>
        <Typography sx={{ textAlign: "center", mb: 2 }}>⬇️</Typography>
        <Divider sx={{ mb: 2 }} />

        <ListItem sx={{ display: "block", mb: 1 }}>
          <Typography variant="h6">● Step 4: Select Category</Typography>
          <Typography variant="body1">
            Choose the category that best fits your blog, e.g.,{" "}
            <strong>Animals</strong>, <strong>Travel</strong>,{" "}
            <strong>Technology</strong>.
          </Typography>
        </ListItem>
        <Typography sx={{ textAlign: "center", mb: 2 }}>⬇️</Typography>
        <Divider sx={{ mb: 2 }} />

        <ListItem sx={{ display: "block", mb: 1 }}>
          <Typography variant="h6">● Step 5: Content</Typography>
          <Typography variant="body1">
            In the <strong>"Content"</strong> field, write your blog in detail
            from beginning to end. Add headings, images, links, etc.
          </Typography>
        </ListItem>
        <Typography sx={{ textAlign: "center", mb: 2 }}>⬇️</Typography>
        <Divider sx={{ mb: 2 }} />

        <ListItem sx={{ display: "block", mb: 1 }}>
          <Typography variant="h6">● Step 6: Review & Publish</Typography>
          <Typography variant="body1">
            Review your blog. Once satisfied, click <strong>"Publish"</strong>.
          </Typography>
        </ListItem>
      </List>

      <StyledLink to="/add-article">
        <h3 style={{ textAlign: "center", marginTop: 20 }}>
          Let's get started! Let's create your first blog!
        </h3>
      </StyledLink>
    </Box>
  );
}

export default FormCreateBlogPage;
