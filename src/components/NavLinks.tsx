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
          <NavLink
            to="/register"
            className="rounded bg-white px-4 py-1.5 font-semibold text-gray-900 transition-colors hover:bg-gray-200"
          >
            Kayıt Ol
          </NavLink>
        )}
      </>
    );
  }

  return <UserMenu />;
};

export default NavLinks;
