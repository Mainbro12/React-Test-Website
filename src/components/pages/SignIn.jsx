import { Box, Button, TextField } from "@mui/material"; // Імпортуємо UI-компоненти з Material UI
import { useFormik } from "formik"; // Хук Formik для роботи з формами
import * as Yup from "yup"; // Yup для валідації форм

function SignInPage({ setUser }) {
  const formik = useFormik({
    initialValues: {
      // Початкові значення полів форми
      email: "",
      password: "",
    },
    validateOnChange: false, // Валідація лише при сабміті, не при кожному вводі
    validationSchema: Yup.object({
      // Схема валідації форми
      email: Yup.string().email("Invalid email address").required("Required"), // Перевірка email
      password: Yup.string()
        .max(32, "Must be 32 characters or less") // Макс 32 символи
        .required("Required"), // Обов’язкове поле
    }),
    onSubmit: async (values, { resetForm }) => {
      // Виконується при натисканні "Sign In"
      try {
        const response = await fetch("http://localhost:3000/signin", {
          method: "POST", // Запит методом POST
          headers: {
            "Content-Type": "application/json", // Тіло запиту у форматі JSON
          },
          body: JSON.stringify(values), // Перетворюємо email+password у JSON
        });

        const responseJson = await response.json(); // Отримуємо відповідь від сервера

        if (!response.ok) {
          // Якщо сервер повернув помилку (401/500 і т.д.)
          throw new Error(`Server error: ${responseJson.message}`);
        }

        localStorage.setItem("token", responseJson.token); // Зберігаємо токен у localStorage
        setUser(responseJson.user);
        setServerError(null); // Скидаємо помилку (потрібен useState для setServerError)
        return responseJson; // Повертаємо дані від сервера
      } catch (error) {
        console.log("dasdsad"); // Тестовий лог
        setServerError(error.message); // Зберігаємо помилку (потрібен useState)
      }
    },
  });

  return (
    <Box maxWidth={600} margin={"auto"}>
      {" "}
      {/* Контейнер з обмеженням ширини і центруванням */}
      <form noValidate onSubmit={formik.handleSubmit}>
        {" "}
        {/* Форма, яку обробляє Formik */}
        {/* Поле для email */}
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formik.values.email} // Значення з formik
          onChange={formik.handleChange} // Оновлення state
          fullWidth
          margin="normal"
          helperText={formik.errors.email} // Показує текст помилки
          error={Boolean(formik.errors.email)} // Якщо є помилка — підсвічує червоним
        />
        {/* Поле для пароля */}
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formik.values.password} // Значення з formik
          onChange={formik.handleChange} // Оновлення state
          fullWidth
          margin="normal"
          helperText={formik.errors.password} // Показує текст помилки
          error={Boolean(formik.errors.password)} // Якщо є помилка — підсвічує червоним
        />
        {/* Кнопка входу */}
        <Button
          type="submit" // Викликає formik.onSubmit
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
}
export default SignInPage; // Експортуємо компонент
