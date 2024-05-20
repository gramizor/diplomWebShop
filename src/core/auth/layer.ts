import { useAuth } from "../../store/authSlice";
import { USER_EMAIL_KEY, USER_TOKEN_KEY } from "../constants";
import {
  loginUserRequest,
  logoutUserRequest,
  registerUserRequest,
} from "./requests";
import { IUserLoginData } from "./types";

export const loginUser = async (loginData: IUserLoginData) => {
  const userData = await loginUserRequest(loginData);
  localStorage.setItem(USER_TOKEN_KEY, userData.data.access_token);
  localStorage.setItem(USER_EMAIL_KEY, loginData.email);
  useAuth.getState().saveUser(loginData.email);
  return userData.data;
};

export const registerUser = async (registerData: IUserLoginData) => {
  await registerUserRequest(registerData);
};

export const logoutUser = async () => {
  const token = localStorage.getItem(USER_TOKEN_KEY);
  if (token) {
    logoutUserRequest(token);
  }
  localStorage.removeItem(USER_EMAIL_KEY);
  localStorage.removeItem(USER_TOKEN_KEY);
  useAuth.getState().logout();
};
