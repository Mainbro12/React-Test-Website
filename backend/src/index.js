import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import db from "./db.js";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import withAuth from "./middleware.js";
import APP_CONFIG from "./config.js";
import generateSlug from "./utils/generate-slug.js";

const app = express();
const port = APP_CONFIG.SERVER_PORT || 3000; // Port
const SECRET_KEY = APP_CONFIG.JWT_SECRET_KEY;

// обробляє / зберігає у папці
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    // Just give it a temporary unique name
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json()); // для парсингу JSON
app.use(bodyParser.urlencoded({ extended: true })); // для form-data
app.use("/uploads", express.static(uploadDir));

// створення запиту та форми для сторінки
app.post("/contact-form", async function (req, res) {
  await db.any(
    "INSERT INTO comments(firstname, lastname, numberphone, email, comment) VALUES(${firstname}, ${lastname}, ${numberphone}, ${email}, ${comment})",
    req.body
  );

  res.send({ message: "Дані збережено!", data: req.body });
});

app.get("/comments", async function (req, res) {
  const allComments = await db.any("SELECT * FROM comments");
  res.json(allComments);
});

// blog

app.get("/articles", async function (req, res) {
  const allArticles = await db.any(
    // SQL код (Бд)
    `
  SELECT 
    articles.*,
    json_build_object(
      'id', users.id,
      'firstname', users.firstname,
      'lastname', users.lastname,
      'email', users.email 
    ) AS user
  FROM articles
  JOIN users ON articles.user_id = users.id
  ORDER BY articles.created_at DESC
`
  );
  res.json(allArticles);
});

// бере article і його слаг для створення окремої сторінки /article/:slug
app.get("/article/:slug", async function (req, res) {
  try {
    const { slug } = req.params;

    const article = await db.oneOrNone(
      // SQL код (Бд)
      `
      SELECT 
        articles.*,
        json_build_object(
          'id', users.id,
          'firstname', users.firstname,
          'lastname', users.lastname,
          'email', users.email
        ) AS user
      FROM articles
      JOIN users ON articles.user_id = users.id
      WHERE articles.slug = $1
      `,
      [slug]
    );

    // Якщо !article ( не існує )
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(article);
  } catch (err) {
    console.error("Error fetching article by slug:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/article/create", withAuth, async function (req, res) {
  const email = req.email;
  // Генерує слаг по тайтлу (Імені)
  const slug = generateSlug(req.body.title);

  // get user id from DB
  const user = await db.one("SELECT id FROM users WHERE email = ${email}", {
    email,
  });

  // створення форми самого Article
  await db.any(
    "INSERT INTO articles(title, image, description, content, slug, user_id, category_id) VALUES(${title}, ${image}, ${description}, ${content}, ${slug}, ${user.id}, ${category_id})",
    { ...req.body, user, slug }
  );

  res.send({ message: "Дані збережено!", data: req.body });
});

// Sign up
app.post("/signup", async function (req, res) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // Bcrypt - бібліотека бля хешування паролю

  // 1. ЗАПИТ ДО ТАБЛИЦІ
  const existingUser = await db.any(
    "SELECT * FROM users WHERE email = ${email}",
    { email: req.body.email }
    // Перевіряє всіх Users по Email
  );
  // Якщо User з таким Email існує, то: 409 помилка
  if (existingUser.length) {
    return res.status(409).send({
      user: existingUser,
      message: "Користувач з таким емейлом вже існує",
    });
  }

  await db.any(
    "INSERT INTO users (firstname, lastname, email, password) VALUES(${firstname}, ${lastname}, ${email}, ${hashedPassword})",
    { ...req.body, hashedPassword }
  );

  return res
    .status(201)
    .send({ message: "Користувача створено", data: req.body });
});

// Sign In
app.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  // Find user by email
  const user = await db.one("SELECT * FROM users WHERE email = ${email}", {
    email,
  });

  if (!user) return res.status(400).json({ message: "User not found" });

  // Compare password with the stored hash
  // Якщо пароль невірний помилка 400
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return res.status(400).json({ message: "Invalid credentials" });

  // Generate JWT token
  const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "4h" });

  res.json({ token, user });
});

app.get("/verify-token", async function (req, res) {
  const token = req.header("Authorization");
  // Якщо токена вже не існує то помилка 401
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    // перевіряє токен користувача (JWT) і дістає інформацію про користувача з бази даних.
    const verified = jwt.verify(token.split(" ")[1], SECRET_KEY);
    const { id, firstname, lastname, email, avatar } = await db.one(
      "SELECT * FROM users WHERE email = ${email}",
      {
        email: verified.email,
      }
    );

    return res.status(200).send({
      user: {
        id,
        firstname,
        lastname,
        email,
        avatar,
      },
    });
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
});

// Profile

// Створюємо ендпоінт Profile, withAuth перевіряє токен користувача.
app.post("/profile", withAuth, upload.single("avatar"), async (req, res) => {
  try {
    const email = req.email;

    // Знаходимо id користувача в базі по email.
    const user = await db.one("SELECT id FROM users WHERE email = ${email}", {
      email,
    });
    const ext = path.extname(req.file.originalname);
    const newFileName = `${user.id}_avatar${ext}`;
    // Зберігаємо в папку Uploads
    const newPath = path.join("uploads", newFileName);

    // rename the uploaded file
    fs.renameSync(req.file.path, newPath);
    // Формуємо URL для доступу до аватара з фронтенду.
    const fileUrl = `/uploads/${newFileName}`;

    // Оновлюємо поле avatar в базі, повертаємо оновлені дані користувача.
    const updatedUser = await db.one(
      `UPDATE users 
         SET avatar = \${avatar}
         WHERE id = \${id}
         RETURNING id, email, avatar`,
      { id: user.id, avatar: fileUrl }
    );

    res.json({
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Category

// Створює категорію, генерує слаг по імені
app.post("/category/create", withAuth, async function (req, res) {
  const slug = generateSlug(req.body.name);

  // Додає нову категорію в базу з полями name, img і slug.
  await db.any(
    "INSERT INTO categories(name, img, slug) VALUES(${name}, ${img}, ${slug})",
    { ...req.body, slug }
  );

  res.send({ message: "Дані збережено!", data: req.body });
});

app.get("/categories", async function (req, res) {
  const categories = await db.any(` 
 SELECT * FROM categories;
`);
  res.json({ categories });
});

app.get("/category/:slug", async function (req, res) {
  try {
    // Беремо slug з URL.
    const { slug } = req.params;
    // Виконує SQL-запит, який:
    // Вибирає категорію (c.*)
    // LEFT JOIN з таблицею articles
    // LEFT JOIN з таблицею users (автор статті)
    // Збирає всі статті категорії в поле articles у вигляді JSON
    // Якщо статей нема — повертає пустий масив '[]'
    const category = await db.oneOrNone(
      `
      SELECT 
        c.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', a.id,
              'title', a.title,
              'slug', a.slug,
              'description', a.description,
              'image', a.image,
              'created_at', a.created_at,
              'user', json_build_object(
                'id', u.id,
                'firstname', u.firstname,
                'lastname', u.lastname,
                'email', u.email
              )
            )
          ) FILTER (WHERE a.id IS NOT NULL),
          '[]'
        ) AS articles
      FROM categories c
      LEFT JOIN articles a ON a.category_id = c.id
      LEFT JOIN users u ON u.id = a.user_id
      WHERE c.slug = $1
      GROUP BY c.id
      `,
      [slug]
    );

    // Якщо категорії з таким slug нема — повертає 404
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    console.error("Error fetching category by slug:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
