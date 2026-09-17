import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import SearchPage from "./pages/SearchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import FavoritesPage from "./pages/FavoritesPage";
import MovieDetailPage from "./pages/MovieDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { logout, setLoading, setUser } from "./store/authSlice";
import { fetchCurrentUser } from "./api/auth";
import ProductedRoute from "./components/ProductedRoute";
import ProfilePage from "./pages/ProfilePage";

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
        <Route path="*" element={<NotFoundPage />} />
        <Route
          path="/profile"
          element={
            <ProductedRoute>
              <ProfilePage />
            </ProductedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
