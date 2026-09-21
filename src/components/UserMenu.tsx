import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";

const UserMenu = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    navigate("/");
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center font-semibold uppercase"
      >
        {user.username.charAt(0)}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm font-medium truncate">{user.username}</p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-700"
          >
            Profil
          </Link>
          <Link
            to="/favorites"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-sm hover:bg-gray-700"
          >
            Favoriler
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
          >
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
