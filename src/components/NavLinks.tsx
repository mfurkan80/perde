import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import UserMenu from "./UserMenu";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-white" : "text-gray-400 hover:text-white";

const NavLinks = () => {
  const user = useAppSelector((state) => state.auth.user);

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

  return <UserMenu />;
};

export default NavLinks;
