import { paths } from "../constants";

type PathsByPermissions = {
  [key: string]: string;
};

export const pathsByPermissions: PathsByPermissions = {
  DASHBOARD: paths.dashboard,
  EMPLOYEES: paths.employees,
  CREATE_EMPLOYEE: paths.createEmployee,
  ROLES: paths.roles,
  CREATE_ROLE: paths.createRole,
  ASSIGN_ROLES_TO_EMPLOYEE: paths.assignRolesToEmployee,
  PERMISSIONS: paths.permissions,
  CREATE_PERMISSION: paths.createPermission,
  ASSIGN_PERMISSIONS_TO_ROLE: paths.assignPermissionsToRole,
};
