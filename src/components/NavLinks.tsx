import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? "text-white" : "text-gray-400 hover:text-white";

const NavLinks = () => {
  return (
    <>
      <NavLink to="/" className={linkClass}>
        Ana Sayfa
      </NavLink>
      <NavLink to="/favorites" className={linkClass}>
        Favoriler
      </NavLink>
    </>
  );
};

export default NavLinks;
