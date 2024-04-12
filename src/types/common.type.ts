export interface CreateAdministratorAccount {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface CreateAdministratorAccountError {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface CreateEmployeeAccount {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface CreateEmployeeAccountError {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export type CreateAccount = CreateAdministratorAccount | CreateEmployeeAccount;
export type CreateAccountError =
  | CreateAdministratorAccountError
  | CreateEmployeeAccountError;
