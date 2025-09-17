import "./App.css";
import { createBrowserRouter, data, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import AppLayout from "./components/layouts/AppLayout.jsx";
import AnotherLayout from "./components/layouts/AnotherLAyout.jsx";
import ContactPage from "./components/pages/ContactForm.jsx";
import CommentsPage from "./components/pages/Comments.jsx";
import BlogPage from "./components/pages/Blog.jsx";
import BlogCreatePage from "./components/pages/BlogCreate.jsx";
import SignInPage from "./components/pages/SignIn.jsx";
import SignUpPage from "./components/pages/SignUp.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import ProfilePage from "./components/pages/Profile.jsx";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          import.meta.env.VITE_SERVER_URL + "/verify-token",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { user } = await res.json();
        setUser(user);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    checkSession();
  }, []);

  const router = createBrowserRouter([
    {
      element: <AppLayout user={user} setUser={setUser} />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/contact-form",
          element: <ContactPage />,
        },
        {
          path: "/comments",
          element: <CommentsPage />,
        },

        {
          path: "/signin",
          element: user ? (
            <Navigate to="/" replace />
          ) : (
            <SignInPage setUser={setUser} />
          ),
        },
        {
          path: "/signup",
          element: user ? <Navigate to="/" replace /> : <SignUpPage />,
        },
        {
          path: "/profile",
          element: user ? (
            <ProfilePage user={user} setUser={setUser} />
          ) : (
            <Navigate to="/signin" replace />
          ),
        },

        {
          path: "/blog",
          children: [
            {
              index: true,
              element: <BlogPage />, // blog form
            },
            {
              path: "create",
              element: !user ? (
                <Navigate to="/signin" replace />
              ) : (
                <BlogCreatePage />
              ), // blog form
            },
          ],
        },
      ],
    },
    {
      element: <AnotherLayout />,
      children: [{}],
    },
  ]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically
          height: "100vh", // Example: make the Box fill the viewport height
        }}
      >
        <CircularProgress size={100} />
      </Box>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
