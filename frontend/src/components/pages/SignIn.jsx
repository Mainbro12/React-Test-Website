import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../api"; // ✅ замість axios в api вже є axios

function SignInPage() {
  const { setUser } = useContext(AuthContext);
  const [serverError, setServerError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(32, "Must be 32 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await api.post("/signin", values);

        localStorage.setItem("token", response.data.token);
        setUser(response.data.user);
        setServerError(null);
      } catch (error) {
        if (error.response) {
          setServerError(error.response.data.message || "Server error");
        } else {
          setServerError(error.message);
        }
      }
    },
  });

  return (
    <Box maxWidth={600} margin={"auto"}>
      <form noValidate onSubmit={formik.handleSubmit}>
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

        {serverError && (
          <Box color="red" mt={1}>
            {serverError}
          </Box>
        )}

        <Button
          type="submit"
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

export default SignInPage;
