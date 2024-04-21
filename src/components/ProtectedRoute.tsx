import React from "react";
import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { paths } from "../constants";

type ProtectedRouteProps = RouteProps & {
  element?: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  return isAuthenticated ? <Outlet /> : <Navigate to={paths.login} />;
};
