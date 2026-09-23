import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { linkClass } from "../utils/linkClass";
import UserMenu from "./UserMenu";

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
