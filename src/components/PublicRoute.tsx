import React from "react";
import { Navigate, Outlet, RouteProps, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { paths } from "../constants";

type PublicRouteProps = RouteProps & {
  restricted?: boolean;
};

export const PublicRoute = ({ restricted }: PublicRouteProps) => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.authReducer);

  if (isAuthenticated && pathname === paths.login)
    return <Navigate to={paths.root} />;

  return <Outlet />;

};
