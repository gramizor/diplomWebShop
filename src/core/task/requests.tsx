import { AxiosResponse } from "axios";
import { taskApi } from "./api";

import {
  GetTasksResponseType,
  IAddSolutionToTask,
  ICreateTask,
  ITask,
  TaskStatusEnum,
} from "./types";
import { ICase } from "../case/types";
import { notifications } from "@mantine/notifications";
import { t } from "i18next";
import classes from "../notifications.module.css";

export const getTasksRequest = async (
  status: TaskStatusEnum
): Promise<AxiosResponse<GetTasksResponseType>> => {
  try {
    const response: AxiosResponse<GetTasksResponseType> = await taskApi.get(
      `/task/?status=${status}`
    );
    return response;
  } catch (error) {
    console.error("Ошибка получения всех задач:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.tasks.GetTasksError"),
      classNames: classes,
    });
    throw error;
  }
};

export const getTaskByIdRequest = async (
  id: number
): Promise<AxiosResponse<ITask>> => {
  try {
    const response: AxiosResponse<ITask> = await taskApi.get(`/task/${id}`);
    return response;
  } catch (error) {
    console.error("Ошибка получения задачи по ID:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.tasks.GetTaskError"),
      classNames: classes,
    });
    throw error;
  }
};

export const changeTaskStatusRequest = async (
  id: number
): Promise<AxiosResponse<ITask>> => {
  try {
    const response: AxiosResponse<ITask> = await taskApi.post(
      `/task/${id}/status`
    );
    notifications.show({
      color: "green",
      title: t("common.Success"),
      message: t("notifications.tasks.UpdateStatusSuccessfull"),
      classNames: classes,
    });
    return response;
  } catch (error) {
    console.error("Ошибка изменения статуса задачи:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.tasks.UpdateStatusError"),
      classNames: classes,
    });
    throw error;
  }
};

export const addCasetoTaskRequest = async (
  taskId: ITask["id"],
  caseId: ICase["id"]
): Promise<AxiosResponse<unknown>> => {
  try {
    const response: AxiosResponse<unknown> = await taskApi.put(
      `/task/${taskId}/case/${caseId}`
    );
    notifications.show({
      color: "green",
      title: t("common.Success"),
      message: t("notifications.tasks.addCaseSuccessfull"),
      classNames: classes,
    });
    return response;
  } catch (error) {
    console.error("Ошибка добавления кейса к задаче:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.tasks.addCaseError"),
      classNames: classes,
    });
    throw error;
  }
};

export const addNewTaskRequest = async (
  data: ICreateTask
): Promise<AxiosResponse<unknown>> => {
  try {
    const response: AxiosResponse<unknown> = await taskApi.post(`/task/`, {
      title: data.title,
      description: data.description,
    });
    return response;
  } catch (error) {
    console.log("Ошибка при добавлении задачи:", error);
   /*  notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.tasks.newTaskError"),
      classNames: classes,
    }); */
    throw error;
  }
};

export const addSolutionToTaskRequest = async (
  data: IAddSolutionToTask
): Promise<AxiosResponse<unknown>> => {
  try {
    const response: AxiosResponse<unknown> = await taskApi.put(
      `/task/${data.id}`,
      {
        solution: data.solution,
      }
    );
    return response;
  } catch (error) {
    console.error("Ошибка создания решения:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.tasks.addSolutionError"),
      classNames: classes,
    });
    throw error;
  }
};

export const removeCaseFromTaskByTaskIDRequest = async (
  id: number
): Promise<void> => {
  try {
    await taskApi.delete(`/task/${id}/case`);
    notifications.show({
      color: "green",
      title: t("common.Success"),
      message: t("notifications.tasks.deleteCaseSuccessful"),
      classNames: classes,
    });
  } catch (error) {
    console.error("Ошибка при удалении:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.tasks.deleteCaseError"),
      classNames: classes,
    });
    throw error;
  }
};

export const removeSolutionFromTaskByTaskIDRequest = async (
  id: number
): Promise<void> => {
  try {
    await taskApi.delete(`/task/${id}/solution`);
    notifications.show({
      color: "green",
      title: t("common.Success"),
      message: t("notifications.tasks.deleteSolutionSuccessfull"),
      classNames: classes,
    });
  } catch (error) {
    console.error("Ошибка при удалении:", error);
    notifications.show({
      color: "red",
      title: t("common.Error"),
      message: t("notifications.tasks.deleteSolutionError"),
      classNames: classes,
    });
    throw error;
  }
};
