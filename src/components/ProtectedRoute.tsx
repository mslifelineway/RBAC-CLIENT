import React from "react";
import { Navigate, Outlet, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { paths } from "../constants";

type ProtectedRouteProps = RouteProps & {
  element?: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer
  );

  return isAuthenticated ? <Outlet /> : <Navigate to={paths.login} />;
};
