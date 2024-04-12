import { EBaseURLs, EHttpMethods, getAxiosInstance } from "./axios";

export interface MakeApiCallProps<T extends unknown> {
  payload: T;
  endpoint: string;
  method: EHttpMethods;
  baseURL?: EBaseURLs;
  withCredentials?: boolean;
}

export const makeApiCall = async <T extends unknown>(
  props: MakeApiCallProps<T>
) => {
  const {
    payload,
    endpoint,
    method,
    baseURL = EBaseURLs.EMPLOYEE,
    withCredentials,
  } = props;
  const axiosInstance = getAxiosInstance(baseURL, withCredentials);

  const getApiCall = async () => {
    return await axiosInstance.get(endpoint);
  };

  const postApiCall = async () => {
    return await axiosInstance.post(endpoint, payload || {});
  };

  const putApiCall = async () => {
    return await axiosInstance.put(endpoint, payload || {});
  };

  const patchApiCall = async () => {
    return await axiosInstance.patch(endpoint, payload || {});
  };

  const deleteApiCall = async () => {
    return await axiosInstance.delete(endpoint);
  };

  switch (method) {
    case EHttpMethods.GET:
      return await getApiCall();
    case EHttpMethods.POST:
      return await postApiCall();
    case EHttpMethods.PUT:
      return await putApiCall();
    case EHttpMethods.PATCH:
      return await patchApiCall();
    case EHttpMethods.DELETE:
      return await deleteApiCall();
  }
};
