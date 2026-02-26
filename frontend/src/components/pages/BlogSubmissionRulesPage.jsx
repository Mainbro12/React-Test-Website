import { Box, Typography, List, ListItem } from "@mui/material";

function BlogSubmissionRulesPage() {
  const rules = [
    "Do not use advertising",
    "Do not use profanity",
    "Do not offend anyone",
    "Write unique content, do not copy others' materials",
    "Stick to the blog topic",
    "Use clear and polite language",
    "Add only relevant images and links",
    "Check your text for errors before publishing",
    "Do not publish personal data of other people",
    "Respect intellectual property and copyrights",
    "Avoid spoilers without warning",
    "Do not use offensive or discriminatory memes/images",
    "Follow community rules and the law",
    "Publish only safe content (no violence or dangerous advice)",
    "Avoid political propaganda",
    "Do not publish adult content",
    "Add sources if quoting someone else's information",
    "Do not spread fake news",
    "Maintain proper grammar and punctuation",
    "Use headings and paragraphs for readability",
    "Do not publish the same content multiple times",
    "Add tags or categories for better navigation",
    "Do not post materials that violate music or video copyrights",
    "Avoid clickbait titles",
    "Do not use multi-level scripts or harmful code",
    "Stick to the chosen category topic",
    "Publish only accurate information",
    "Avoid excessive advertising of affiliate links",
    "Respect other authors' opinions",
    "Do not intentionally create conflict posts",
    "Do not publish content that violates confidentiality",
    "Use clear and high-quality images",
    "Do not insult the administration",
    "Add alternative text for images for accessibility",
    "Follow safety rules when describing travel or experiments",
    "Avoid publications that may offend vulnerable groups",
    "Do not publish content that is harmful or dangerous",
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Blog Submission Rules:
      </Typography>
      <List>
        {rules.map((rule, index) => (
          <ListItem key={index} sx={{ display: "list-item", pl: 2 }}>
            <Typography>
              {index + 1}. {rule}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default BlogSubmissionRulesPage;
