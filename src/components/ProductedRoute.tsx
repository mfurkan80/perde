import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import Spinner from "./Spinner";

interface ProductedRouteProps {
  children: React.ReactNode;
}

const ProductedRoute = ({ children }: ProductedRouteProps) => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  return <>{children}</>;
};

export default ProductedRoute;
