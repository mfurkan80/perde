import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import Spinner from "./Spinner";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
