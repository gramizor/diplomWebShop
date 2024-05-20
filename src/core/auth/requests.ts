import { AxiosResponse } from "axios";
import {
  IUserLoginData,
  IUserLoginResponse,
  IUserRegisterData,
  IUserRegisterResponse,
} from "./types";
import { authApi } from "./api";
import { notifications } from "@mantine/notifications";
import { t } from "i18next";
import classes from "../notifications.module.css";

export const loginUserRequest = async (
  body: IUserLoginData
): Promise<AxiosResponse<IUserLoginResponse>> => {
  try {
    const response: AxiosResponse<IUserLoginResponse> = await authApi.post(
      "/auth/login",
      body
    );
    notifications.show({
      color: "green",
      title: t("common.Success"),
      message: t("notifications.auth.loginSuccessful"),
      classNames: classes,
    });
    return response;
  } catch (error) {
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.auth.LoginError"),
      classNames: classes,
    });
    throw error;
  }
};

export const registerUserRequest = async (
  body: IUserRegisterData
): Promise<AxiosResponse<IUserRegisterResponse>> => {
  try {
    const response: AxiosResponse<IUserRegisterResponse> = await authApi.post(
      "/auth/register",
      body
    );
    notifications.show({
      color: "green",
      title: t("common.Success"),
      message: t("notifications.auth.registrationSuccessful"),
      classNames: classes,
    });
    return response;
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.auth.RegistrationError"),
      classNames: classes,
    });
    throw error;
  }
};

export const logoutUserRequest = async (token: string) => {
  try {
    await authApi.post("/auth/logout", null, {
      headers: { Authorization: `Bearer ${token}` },
    });
    notifications.show({
      color: "green",
      title: t("common.Success"),
      message: t("notifications.auth.logoutSuccessful"),
      classNames: classes,
    });
  } catch (error) {
    console.error("Ошибка выхода:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.auth.LogoutError"),
      classNames: classes,
    });
    throw error;
  }
};
