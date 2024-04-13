import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export enum EBaseURLs {
  PRODUCT = "http://localhost:8080/products",
  ADMINISTRATOR_AUTH = "http://localhost:8081/auth",
  ADMINISTRATOR = "http://localhost:8081/administrators",
  PERMISSION = "http://localhost:8082/permissions",
  ROLE = "http://localhost:8083/roles",
  EMPLOYEE_AUTH = "http://localhost:8084/auth",
  EMPLOYEE = "http://localhost:8084/employees",
}

export enum EHttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const getAxiosInstance = (
  baseURL: EBaseURLs,
  withCredentials: boolean = true
): AxiosInstance => {
  const config: CreateAxiosDefaults = {
    baseURL,
    withCredentials,
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  };

  const axiosInstance = axios.create(config);

  // axiosInstance.interceptors.request.use((req: any) => {
  //   return req;
  // });

  // axiosInstance.interceptors.response.use((res: any) => {
  //   return res;
  // });

  return axiosInstance;
};
