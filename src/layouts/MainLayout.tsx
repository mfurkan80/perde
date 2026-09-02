import { Link, NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header className="bg-gray-900 text-white px-4 py-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-xl font-bold">Perde</h1>
        </Link>
        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-400 hover:text-white"
            }
          >
            Ana Sayfa
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-400 hover:text-white"
            }
          >
            Arama
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "text-white" : "text-gray-400 hover:text-white"
            }
          >
            Favoriler
          </NavLink>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-gray-400 text-sm px-4 py-6 text-center">
        Film bilgisi almak için doğru adres
      </footer>
    </div>
  );
};

export default MainLayout;
