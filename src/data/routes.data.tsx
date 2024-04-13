import React from "react";
import { Navigate } from "react-router-dom";
import { paths } from "../constants";
import { CreateEmployee, Dashboard, Employees } from "../containers";

export interface AppRoute {
  path: string;
  element: React.ReactNode | null;
}

export const appRoutes: AppRoute[] = [
  { path: paths.root, element: <Navigate to={paths.dashboard} /> },
  { path: paths.dashboard, element: <Dashboard /> },
  { path: paths.employees, element: <Employees /> },
  { path: paths.createEmployee, element: <CreateEmployee /> },
];

export const getRoutesByPaths = (routePaths: string[]) => {
  return appRoutes.filter((r) => routePaths.includes(r.path));
};
