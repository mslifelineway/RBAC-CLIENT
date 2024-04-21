import React from "react";
import { paths, permissionKeys } from "./constants";
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
  Welcome,
} from "./containers";

export interface AppRoute {
  path: string;
  element: React.ReactNode | null;
  permissionKey?: string;
  disablePermissionCheck?: boolean;
}

export const publicRoutes: AppRoute[] = [];

export const protectedRoutes: AppRoute[] = [
  { path: paths.root, element: <Welcome />, disablePermissionCheck: true },
  {
    path: paths.dashboard,
    element: <Dashboard />,
    permissionKey: permissionKeys.viewDashboard,
  },
  {
    path: paths.employees,
    element: <Employees />,
    permissionKey: permissionKeys.viewEmployees,
  },
  {
    path: paths.createEmployee,
    element: <CreateEmployee />,
    permissionKey: permissionKeys.createEmployee,
  },
  {
    path: paths.roles,
    element: <Roles />,
    permissionKey: permissionKeys.viewRoles,
  },
  {
    path: paths.createRole,
    element: <CreateRole />,
    permissionKey: permissionKeys.createEmployee,
  },
  {
    path: paths.assignRolesToEmployee,
    element: <AssignRolesToEmployee />,
    permissionKey: permissionKeys.assignRole,
  },
  {
    path: paths.permissions,
    element: <Permissions />,
    permissionKey: permissionKeys.viewPermissions,
  },
  {
    path: paths.createPermission,
    element: <CreatePermission />,
    permissionKey: permissionKeys.createPermission,
  },
  {
    path: paths.assignPermissionsToRole,
    element: <AssignPermissionsToRole />,
    permissionKey: permissionKeys.assignPermission,
  },
];
