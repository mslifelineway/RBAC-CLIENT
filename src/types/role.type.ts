import { IPermission } from "./permission.type";

export interface IRole {
  _id: string;
  name: string;
  description: string;
  permissions: IPermission[] | string[];
}

export interface ICreateRole {
  name: string;
  description: string;
}
export interface ICreateRoleError {
  name: string;
  description: string;
}
