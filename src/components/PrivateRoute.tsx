import { useAuth } from "@/lib/UserContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const { user } = useAuth();

  return user ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
