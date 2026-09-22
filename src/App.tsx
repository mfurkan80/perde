import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { fetchCurrentUser } from "./api/auth";
import ProductedRoute from "./components/ProductedRoute";
import ScrollToTop from "./components/ScrollToTop";
import MainLayout from "./layouts/MainLayout";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SearchPage from "./pages/SearchPage";
import { logout, setLoading, setUser } from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import ContactPage from "./pages/ContactPage";

const App = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      dispatch(setLoading(false));
      return;
    }
    fetchCurrentUser(token)
      .then((user) => dispatch(setUser(user)))
      .catch(() => dispatch(logout()));
  }, [token, dispatch]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/favorites"
            element={
              <ProductedRoute>
                <FavoritesPage />
              </ProductedRoute>
            }
          />
          <Route path="/movie/:id" element={<MovieDetailPage />} />

          <Route
            path="/profile"
            element={
              <ProductedRoute>
                <ProfilePage />
              </ProductedRoute>
            }
          />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
