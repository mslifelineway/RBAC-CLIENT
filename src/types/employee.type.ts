import { IRole } from "./role.type";

export interface IEmployee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roles: string[] | IRole[];
}

export interface ICreateEmployee {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
}

export interface ICreateEmployeeError {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
}
