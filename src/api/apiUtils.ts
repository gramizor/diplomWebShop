import apiClient from "./apiClient";

interface ApiResponse<T> {
  data: T;
}

export const getRequest = async <T>(url: string): Promise<T> => {
  const response = await apiClient.get<ApiResponse<T>>(url);
  return response.data.data;
};

export const postRequest = async <T, U>(url: string, data: U): Promise<T> => {
  const response = await apiClient.post<ApiResponse<T>>(url, data);
  return response.data.data;
};

export const putRequest = async <T, U>(url: string, data: U): Promise<T> => {
  const response = await apiClient.put<ApiResponse<T>>(url, data);
  return response.data.data;
};
