import React from "react";
import { Navigate } from "react-router-dom";
import { paths } from "../constants";
import {
  CreateEmployee,
  Dashboard,
  Employees,
  Roles,
  CreateRole,
  AssignRolesToEmployee,
  Permissions,
  CreatePermission,
  AssignPermissionsToRole,
} from "../containers";

export interface AppRoute {
  path: string;
  element: React.ReactNode | null;
}

export const appRoutes: AppRoute[] = [
  { path: paths.root, element: <Navigate to={paths.dashboard} /> },
  { path: paths.dashboard, element: <Dashboard /> },
  { path: paths.employees, element: <Employees /> },
  { path: paths.createEmployee, element: <CreateEmployee /> },
  { path: paths.roles, element: <Roles /> },
  { path: paths.createRole, element: <CreateRole /> },
  { path: paths.assignRolesToEmployee, element: <AssignRolesToEmployee /> },
  { path: paths.permissions, element: <Permissions /> },
  { path: paths.createPermission, element: <CreatePermission /> },
  { path: paths.assignPermissionsToRole, element: <AssignPermissionsToRole /> },
];

export const getRoutesByPaths = (routePaths: string[]) => {
  return appRoutes.filter((r) => routePaths.includes(r.path));
};
