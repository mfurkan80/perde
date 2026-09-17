import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/authSlice";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-white" : "text-gray-400 hover:text-white";

const NavLinks = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  if (!user) {
    return (
      <>
        <NavLink to="/login" className={linkClass}>
          Giriş Yap
        </NavLink>
        <NavLink to="/register" className={linkClass}>
          Kayıt Ol
        </NavLink>
      </>
    );
  }
  return (
    <>
      <NavLink to="/favorites" className={linkClass}>
        Favoriler
      </NavLink>
      <NavLink to="/profile" className={linkClass}>
        {user.username}
      </NavLink>
      <button
        onClick={() => dispatch(logout())}
        className="text-gray-400 hover:text-white"
      >
        Çıkış
      </button>
    </>
  );
};

export default NavLinks;
