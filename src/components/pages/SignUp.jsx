import { Box, Button, TextField, Typography } from "@mui/material"; // Компоненти MUI: контейнер, кнопка, поля вводу, текст
import { useFormik } from "formik"; // Хук для керування формою
import * as Yup from "yup"; // Бібліотека для валідації
import { useState } from "react"; // useState для локального стану (наприклад, для помилок)
import PasswordStrengthBar from "react-password-strength-bar"; // для перевірки паролю на надійність

function SignUpPage() {
  const [serverError, setServerError] = useState(null); // Стан для повідомлення про помилку сервера

  const formik = useFormik({
    initialValues: {
      // Початкові значення полів форми
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repeatPassword: "",
    },

    validateOnChange: false, // Валідація тільки при сабміті (не після кожного вводу символу)

    validationSchema: Yup.object({
      // Схема валідації за допомогою Yup
      firstname: Yup.string()
        .max(15, "Must be 15 characters or less") // Максимум 15 символів
        .required("Required"), // Поле обов’язкове
      lastname: Yup.string()
        .max(20, "Must be 20 characters or less") // Максимум 20 символів
        .required("Required"), // Поле обов’язкове
      email: Yup.string()
        .email("Invalid email address") // Має бути валідний email
        .required("Required"), // Обов’язкове поле
      password: Yup.string()
        .max(32, "Must be 32 characters or less") // Макс 32 символи
        .required("Required"), // Обов’язкове поле
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match") // Повинно співпадати з `password`
        .required("Required"), // Обов’язкове поле
    }),

    onSubmit: async (values, { resetForm }) => {
      // Виконується при натисканні кнопки "Sign Up"
      try {
        const response = await fetch("http://localhost:3000/signup", {
          method: "POST", // Використовуємо POST-запит
          headers: {
            "Content-Type": "application/json", // Тіло у форматі JSON
          },
          body: JSON.stringify(values), // Перетворюємо дані користувача в JSON
        });

        const responseJson = await response.json(); // Читаємо відповідь від сервера

        if (!response.ok) {
          // Якщо сервер повернув помилку (наприклад 400/500)
          throw new Error(`Server error: ${responseJson.message}`);
        }

        resetForm(); // Очищуємо форму після успішної реєстрації
        setServerError(null); // Забираємо повідомлення про помилку
        return responseJson; // Повертаємо результат сервера
      } catch (error) {
        console.log("dasdsad"); // Тестовий лог (можна прибрати)
        setServerError(error.message); // Встановлюємо повідомлення про помилку
      }
    },
  });

  return (
    <Box maxWidth={600} margin={"auto"}>
      {" "}
      {/* Контейнер шириною до 600px, вирівняний по центру */}
      {serverError ? ( // Якщо є помилка з сервера — показати її
        <Typography variant="body1" color="error">
          {serverError}
        </Typography>
      ) : null}
      <form noValidate onSubmit={formik.handleSubmit}>
        {" "}
        {/* Форма, яку обробляє Formik */}
        {/* Поле для імені */}
        <TextField
          label="Firstname"
          name="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          helperText={formik.errors.firstname} // Текст помилки під полем
          error={Boolean(formik.errors.firstname)} // Якщо є помилка — підсвічує червоним
        />
        {/* Поле для прізвища */}
        <TextField
          label="Lastname"
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          helperText={formik.errors.lastname}
          error={Boolean(formik.errors.lastname)}
        />
        {/* Поле для email */}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          helperText={formik.errors.email}
          error={Boolean(formik.errors.email)}
        />
        {/* Поле для пароля */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          helperText={formik.errors.password}
          error={Boolean(formik.errors.password)}
        />
        <PasswordStrengthBar password={formik.values.password} />
        {/* Поле для повторного введення пароля */}
        <TextField
          label="Repeat Password"
          name="repeatPassword"
          type="password"
          value={formik.values.repeatPassword}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          helperText={formik.errors.repeatPassword}
          error={Boolean(formik.errors.repeatPassword)}
        />
        {/* Кнопка відправки форми */}
        <Button
          type="submit" // Викликає formik.onSubmit
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
}

export default SignUpPage; // Експортуємо компонент
