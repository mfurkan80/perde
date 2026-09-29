import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { CloseIcon } from "./Icons";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block rounded px-3 py-2 ${
    isActive
      ? "bg-gray-800 text-white"
      : "text-gray-300 hover:bg-gray-800 hover:text-white"
  }`;

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const user = useAppSelector((state) => state.auth.user);

  // Menü açıkken: arkadaki sayfa kaymasın + Escape ile kapansın.
  // İkisi de React dışına (document) dokunduğu için effect işi.
  useEffect(() => {
    if (!isOpen) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) onClose();
    };
    mq.addEventListener("change", handleChange);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      mq.removeEventListener("change", handleChange);
    };
  }, [isOpen, onClose]);

  return (
    <div className="md:hidden">
      {/* Karartma: panelin dışına dokunmak = buna dokunmak → kapat */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-black/60 transition-all duration-300 ${
          isOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Panel: soldan kayarak gelir */}
      <nav
        aria-label="Mobil menü"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[80%] flex-col bg-gray-900 p-6 shadow-xl transition-all duration-300 ${
          isOpen ? "visible translate-x-0" : "invisible -translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" onClick={onClose} className="text-xl font-bold">
            Perde<span className="text-red-500">.</span>
          </Link>
          <button
            type="button"
            aria-label="Menüyü kapat"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-white"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <NavLink to="/" end onClick={onClose} className={mobileLinkClass}>
            Ana Sayfa
          </NavLink>
          <NavLink to="/movie" onClick={onClose} className={mobileLinkClass}>
            Filmler
          </NavLink>
          <NavLink to="/tv" onClick={onClose} className={mobileLinkClass}>
            Diziler
          </NavLink>
          {user && (
            <NavLink
              to="/favorites"
              onClick={onClose}
              className={mobileLinkClass}
            >
              Favorilerim
            </NavLink>
          )}
        </div>

        {!user && (
          <div className="mt-auto border-t border-gray-800 pt-6">
            <Link
              to="/register"
              onClick={onClose}
              className="block rounded bg-white px-4 py-2 text-center font-semibold text-gray-900"
            >
              Kayıt Ol
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default MobileMenu;
