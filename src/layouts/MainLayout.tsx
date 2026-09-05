import { Link, Outlet } from "react-router-dom";
import NavLinks from "../components/NavLinks";
import SearchBar from "../components/SearchBar";

const MainLayout = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
          <div className="flex items-center justify-between">
            <Link to="/">
              <h1 className="text-xl font-bold">Perde</h1>
            </Link>
            <nav className="flex gap-6 md:hidden">
              <NavLinks />
            </nav>
          </div>

          <SearchBar />

          <nav className="hidden md:flex gap-6">
            <NavLinks />
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6 w-full flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-gray-400 text-sm px-4 py-6 text-center">
        Film bilgisi almak için doğru adres
      </footer>
    </div>
  );
};

export default MainLayout;
