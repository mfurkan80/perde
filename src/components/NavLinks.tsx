import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { linkClass } from "../utils/linkClass";
import UserMenu from "./UserMenu";

export interface NavLinksProps {
  compact?: boolean;
}

const NavLinks = ({ compact = false }: NavLinksProps) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) {
    return (
      <>
        <NavLink to="/login" className={linkClass}>
          Giriş Yap
        </NavLink>
        {!compact && (
          <NavLink to="/register" className={linkClass}>
            Kayıt Ol
          </NavLink>
        )}
      </>
    );
  }

  return <UserMenu />;
};

export default NavLinks;
