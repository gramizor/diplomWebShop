import axios from "axios";
import store from "../store";
import { refresh, logout } from "../store/slices/authSlice";
import BASE_URL from "./config";

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken =
      state.auth.access || localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const state = store.getState();
        const refreshToken =
          state.auth.refresh || localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await store.dispatch(
            refresh({ refresh: refreshToken })
          );
          const { access } = response.payload;
          localStorage.setItem("accessToken", access);
          axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
          originalRequest.headers["Authorization"] = `Bearer ${access}`;
          return axios(originalRequest);
        }
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
