import "./App.css";
import { createBrowserRouter, data, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import AppLayout from "./components/layouts/AppLayout.jsx";
import ContactPage from "./components/pages/ContactForm.jsx";
import CommentsPage from "./components/pages/Comments.jsx";
import BlogPage from "./components/pages/Blog.jsx";
import BlogCreatePage from "./components/pages/BlogCreate.jsx";
import SignInPage from "./components/pages/SignIn.jsx";
import SignUpPage from "./components/pages/SignUp.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import { useEffect, useState } from "react";
import ProfilePage from "./components/pages/Profile.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import ArticlePage from "./components/pages/ArticlePage.jsx";

function App() {
  const [user, setUser] = useState(null);
  console.log(user);
  const router = createBrowserRouter([
    {
      element: (
        <AuthProvider user={user} setUser={setUser}>
          <AppLayout />
        </AuthProvider>
      ),

      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/article/:slug",
          element: <ArticlePage />,
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
          element: user ? <Navigate to="/" replace /> : <SignInPage />,
        },
        {
          path: "/signup",
          element: user ? <Navigate to="/" replace /> : <SignUpPage />,
        },
        {
          path: "/profile",
          element: user ? <ProfilePage /> : <Navigate to="/signin" replace />,
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
