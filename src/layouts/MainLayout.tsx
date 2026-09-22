import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavLinks from "../components/NavLinks";
import SearchBar from "../components/SearchBar";

const MainLayout = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-gray-900 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center justify-between md:w-64">
            <Link to="/">
              <h1 className="text-xl font-bold">Perde</h1>
            </Link>
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
