export interface IPermission {
  _id: string;
  name: string;
  description: string;
}

export interface ICreatePermission {
  name: string;
  description: string;
}
export interface ICreatePermissionError {
  name: string;
  description: string;
}
