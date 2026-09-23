import { Link, NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavLinks from "../components/NavLinks";
import SearchBar from "../components/SearchBar";
import { linkClass } from "../utils/linkClass";

const MainLayout = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-gray-900 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center justify-between gap-6 md:w-auto">
            <div className="flex items-center gap-6">
              <Link to="/">
                <h1 className="text-xl font-bold md:text-2xl md:font-extrabold md:tracking-tight">
                  Perde<span className="text-red-500">.</span>
                </h1>
              </Link>

              <span className="hidden h-6 w-px bg-gray-700 md:block" />

              <nav className="flex gap-4 md:text-sm">
                <NavLink to="/" end className={linkClass}>
                  Filmler
                </NavLink>
                <NavLink to="/tv" className={linkClass}>
                  Diziler
                </NavLink>
              </nav>
            </div>

            <nav className="flex gap-6 md:hidden">
              <NavLinks />
            </nav>
          </div>

          <div className="flex-1 flex justify-center">
            <SearchBar />
          </div>

          <nav className="hidden md:flex gap-6 justify-end md:w-64">
            <NavLinks />
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
