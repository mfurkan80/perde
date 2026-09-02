import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header>
        <h1>Perde</h1>
        <nav>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Ana Sayfa
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Arama
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Favoriler
          </NavLink>
        </nav>
      </header>
      <Outlet />
      <footer>Film bilgisi almak için doğru adres</footer>
    </div>
  );
};

export default MainLayout;
