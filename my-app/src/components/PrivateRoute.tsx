import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("token");


    if (token && !isAuthenticated) {
      login(token); 
    }
  }, [isAuthenticated, login]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
