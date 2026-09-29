import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { linkClass } from "../utils/linkClass";
import { CloseIcon, MenuIcon, SearchIcon } from "./Icons";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";

const iconButtonClass = "p-1 text-gray-300 hover:text-white";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white px-4 py-4">
      {/* MOBİL: sadece md altında görünür */}
      <div className="md:hidden">
        {isSearchOpen ? (
          // Arama modu: satırın tamamı arama kutusu + kapat butonu
          <div className="flex h-10 items-center gap-3">
            <div className="flex-1">
              <SearchBar autoFocus onClose={closeSearch} />
            </div>
            <button
              type="button"
              aria-label="Aramayı kapat"
              onClick={closeSearch}
              className={iconButtonClass}
            >
              <CloseIcon />
            </button>
          </div>
        ) : (
          // Normal mod: solda menü + logo, sağda arama + giriş
          <div className="flex h-10 items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Menüyü aç"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(true)}
                className={iconButtonClass}
              >
                <MenuIcon />
              </button>

              <Link to="/">
                <h1 className="text-xl font-bold">
                  Perde<span className="text-red-500">.</span>
                </h1>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                aria-label="Ara"
                onClick={() => setIsSearchOpen(true)}
                className={iconButtonClass}
              >
                <SearchIcon />
              </button>

              <NavLinks compact />
            </div>
          </div>
        )}
      </div>

      {/* Menü, flex satırının DIŞINDA: yoksa justify-between'i bozar */}
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />

      {/* MASAÜSTÜ: sadece md ve üstünde görünür */}
      <div className="hidden md:flex max-w-7xl mx-auto items-center gap-4">
        <div className="flex items-center gap-6">
          <Link to="/">
            <h1 className="text-2xl font-extrabold tracking-tight">
              Perde<span className="text-red-500">.</span>
            </h1>
          </Link>

          <span className="h-6 w-px bg-gray-700" />

          <nav className="flex gap-4 text-sm">
            <NavLink to="/movie" className={linkClass}>
              Filmler
            </NavLink>
            <NavLink to="/tv" className={linkClass}>
              Diziler
            </NavLink>
          </nav>
        </div>

        <div className="flex-1 flex justify-center">
          <SearchBar />
        </div>

        <nav className="flex items-center gap-6 justify-end w-64">
          <NavLinks />
        </nav>
      </div>
    </header>
  );
};

export default Header;
