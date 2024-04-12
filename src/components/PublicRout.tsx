import React from "react";
import { Navigate, Outlet, RouteProps, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { paths } from "../constants";

type PublicRouteProps = RouteProps & {
  element?: React.ReactNode;
};

export const PublicRoute: React.FC<PublicRouteProps> = () => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useSelector(
    (state: RootState) => state.authReducer
  );
  console.log(isAuthenticated, 'isAuthenticated')
  if (isAuthenticated && pathname === paths.login)
    return <Navigate to={paths.dashboard} />;

  return <Outlet />;
};
