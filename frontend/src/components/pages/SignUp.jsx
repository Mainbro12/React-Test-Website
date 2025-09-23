import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import api from "../../api"; // <-- наш axios instance

function SignUpPage() {
  const [serverError, setServerError] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repeatPassword: "",
    },

    validateOnChange: false,

    validationSchema: Yup.object({
      firstname: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      lastname: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(32, "Must be 32 characters or less")
        .required("Required"),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await api.post("/signup", values);
        resetForm();
        setServerError(null);
        return response.data;
      } catch (error) {
        setServerError(error.response?.data?.message || error.message);
      }
    },
  });

  return (
    <Box maxWidth={600} margin={"auto"}>
      {serverError && (
        <Typography variant="body1" color="error">
          {serverError}
        </Typography>
      )}

      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          label="Firstname"
          name="firstname"
          value={formik.values.firstname}
          onChange={formik.handleChange}
          fullWidth
          margin="normal"
          helperText={formik.errors.firstname}
          error={Boolean(formik.errors.firstname)}
        />

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

        <Button
          type="submit"
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

export default SignUpPage;
