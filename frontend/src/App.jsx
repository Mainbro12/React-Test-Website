import "./App.css";
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import AppLayout from "./components/layouts/AppLayout.jsx";
import ContactPage from "./components/pages/ContactForm.jsx";
import CommentsPage from "./components/pages/Comments.jsx";
import SignInPage from "./components/pages/SignIn.jsx";
import SignUpPage from "./components/pages/SignUp.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import { useEffect, useState } from "react";
import ProfilePage from "./components/pages/Profile.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import ArticlePage from "./components/pages/ArticlePage.jsx";
import CategoryPage from "./components/pages/CategoryPage.jsx";
import api from "./api.js";
import AddCategoryPage from "./components/pages/AddCategoryPage.jsx";
import AddArticlePage from "./components/pages/AddArticlePage.jsx";

function App() {
  const [categories, setCategories] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get("/categories");
      setCategories(response.data.categories);
    };

    fetchCategories();
  }, []);
  const router = createBrowserRouter([
    {
      element: (
        <AuthProvider user={user} setUser={setUser}>
          <AppLayout categories={categories} />
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
          path: "/add-article",
          element: !user ? (
            <Navigate to="/signin" replace />
          ) : (
            <AddArticlePage categories={categories} />
          ), // blog form
        },
        {
          path: "/add-category",
          element: !user ? (
            <Navigate to="/signin" replace />
          ) : (
            <AddCategoryPage categories={categories} />
          ),
        },
      ],
    },
    {
      element: (
        <AuthProvider user={user} setUser={setUser}>
          <AppLayout isUseContainer={false} categories={categories} />
        </AuthProvider>
      ),
      children: [
        {
          path: "/category/:slug",
          element: <CategoryPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
