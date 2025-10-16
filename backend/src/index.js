import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";
import withAuth from "./middleware.js";
import APP_CONFIG from "./config.js";
import generateSlug from "./utils/generate-slug.js";

const app = express();
const port = APP_CONFIG.SERVER_PORT || 3000;
const SECRET_KEY = APP_CONFIG.JWT_SECRET_KEY;
const prisma = new PrismaClient();

// Multer для завантаження файлів
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });
const uploadDir = path.join(process.cwd(), "uploads");
const avatarUploadDir = path.join(uploadDir, "avatars");
if (!fs.existsSync(avatarUploadDir))
  fs.mkdirSync(avatarUploadDir, { recursive: true });

const backgroundUploadDir = path.join(uploadDir, "backgrounds");
if (!fs.existsSync(backgroundUploadDir))
  fs.mkdirSync(backgroundUploadDir, { recursive: true });

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(uploadDir));

// ====================== CONTACT FORM ======================
app.post("/contact-form", async (req, res) => {
  const comment = await prisma.comments.create({ data: req.body });
  res.json({ message: "Дані збережено!", data: comment });
});

app.get("/comments", async (req, res) => {
  const allComments = await prisma.comments.findMany();
  res.json(allComments);
});

// ====================== USERS ======================
app.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return res
      .status(409)
      .json({ message: "Користувач з таким емейлом вже існує" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { firstname, lastname, email, password: hashedPassword },
  });

  res.status(201).json({ message: "Користувача створено", user });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "4h" });
  res.json({ token, user });
});

app.get("/verify-token", async (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    const user = await prisma.user.findUnique({
      where: { email: verified.email },
    });
    res.json({ user });
  } catch {
    res.status(400).json({ message: "Invalid Token" });
  }
});

// ====================== CATEGORIES ======================
app.post("/category/create", withAuth, async (req, res) => {
  const slug = generateSlug(req.body.name);
  const category = await prisma.category.create({
    data: { ...req.body, slug },
  });
  res.json({ message: "Дані збережено!", category });
});

app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json({ categories });
});

app.get("/category/:slug", async (req, res) => {
  const { slug } = req.params;
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      articles: {
        include: {
          user: {
            select: { id: true, firstname: true, lastname: true, email: true },
          },
        },
      },
    },
  });

  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
});

// ====================== ARTICLES ======================
app.get("/articles", async (req, res) => {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          avatar: true,
        },
      },
    },
  });
  res.json(articles);
});

app.get("/article/:slug", async (req, res) => {
  const { slug } = req.params;
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          avatar: true,
        },
      },
    },
  });

  if (!article) return res.status(404).json({ message: "Article not found" });
  res.json(article);
});

app.post("/article/create", withAuth, async (req, res) => {
  try {
    const email = req.email;
    const { title, image, description, content, category_id } = req.body;
    const slug = generateSlug(title);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const article = await prisma.article.create({
      data: {
        title,
        image,
        description,
        content,
        createdAt,
        slug,
        category: { connect: { id: Number(category_id) } },
        user: { connect: { id: user.id } },
      },
    });

    res.json({ article });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// ====================== PROFILE BACKGROUND ======================
app.post(
  "/profile/update",
  withAuth,
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const email = req.email;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(404).json({ message: "User not found" });

      const updateData = {};

      if (req.files.avatar) {
        const avatarFile = req.files.avatar[0];
        const ext = path.extname(avatarFile.originalname);
        const fileName = `${user.id}_avatar${ext}`;
        const filePath = path.join(avatarUploadDir, fileName);
        fs.renameSync(avatarFile.path, filePath);
        updateData.avatar = `/uploads/avatars/${fileName}`;
      }

      if (req.files.background) {
        const bgFile = req.files.background[0];
        const ext = path.extname(bgFile.originalname);
        const fileName = `${user.id}_background${ext}`;
        const filePath = path.join(backgroundUploadDir, fileName);
        fs.renameSync(bgFile.path, filePath);
        updateData.background = `/uploads/backgrounds/${fileName}`;
      }

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: updateData,
      });

      res.json({ message: "Profile updated", user: updatedUser });
    } catch (err) {
      console.error("Profile update error:", err);
      res.status(500).json({ error: "Failed to update profile" });
    }
  }
);

app.get("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        avatar: true,
        background: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
