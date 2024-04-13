import { paths } from "../constants";

type PathsByPermissions = {
  [key: string]: string;
};

export const pathsByPermissions: PathsByPermissions = {
  DASHBOARD: paths.dashboard,
  EMPLOYEES: paths.employees,
  CREATE_EMPLOYEE: paths.createEmployee,
};
