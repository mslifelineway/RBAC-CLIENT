import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";

export enum EBaseURLs {
  PRODUCT = "http://localhost:8080",
  ADMINISTRATOR = "http://localhost:8081",
  PERMISSION = "http://localhost:8082",
  ROLE = "http://localhost:8083",
  EMPLOYEE = "http://localhost:8084",
}

export enum EHttpMethods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const getAxiosInstance = (baseURL: EBaseURLs): AxiosInstance => {
  const config: CreateAxiosDefaults = {
    baseURL,
  };

  const axiosInstance = axios.create(config);

  axiosInstance.interceptors.request.use((req: any) => {
    return req;
  });

  axiosInstance.interceptors.response.use((res: any) => {
    return res;
  });

  return axiosInstance;
};
