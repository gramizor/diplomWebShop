import { useAuth } from "../../store/authSlice";
import { useTasks } from "../../store/tasksSlice";
import { ICase } from "../case/types";
import {
  addCasetoTaskRequest,
  addNewTaskRequest,
  addSolutionToTaskRequest,
  changeTaskStatusRequest,
  getTaskByIdRequest,
  getTasksRequest,
  removeCaseFromTaskByTaskIDRequest,
  removeSolutionFromTaskByTaskIDRequest,
} from "./requests";
import {
  IAddSolutionToTask,
  ICreateTask,
  ITask,
  TaskStatusEnum,
} from "./types";

export const getDraftTasks = async () => {
  const response = await getTasksRequest(TaskStatusEnum.Draft);
  const tasks = response.data;
  useTasks.getState().updateDraftTasks(tasks || []);
  return response.data;
};

export const getActiveTasks = async () => {
  const response = await getTasksRequest(TaskStatusEnum.InProgress);
  const email = useAuth.getState().userName;
  const tasks = response.data;
  const filteredTasks = tasks?.filter((task) => task.user.email === email);
  useTasks.getState().updateActiveTasks(filteredTasks || []);
  return response.data;
};

/* export const getCompletedTasks = async () => {
  const response = await getTasksRequest(TaskStatusEnum.Completed);
  return response.data;
}; */

export const getTaskById = async (id: number) => {
  const response = await getTaskByIdRequest(id);
  return response.data;
};

export const changeTaskStatusById = async (id: number) => {
  const response = await changeTaskStatusRequest(id);
  return response.data;
};

export const addCasetoTask = async (
  taskId: ITask["id"],
  caseId: ICase["id"]
) => {
  const response = await addCasetoTaskRequest(taskId, caseId);
  return response.data;
};

export const addNewTask = async (data: ICreateTask) => {
  const response = await addNewTaskRequest(data);
  return response.data;
};

export const addSolutionToTask = async (data: IAddSolutionToTask) => {
  const response = await addSolutionToTaskRequest(data);
  return response.data;
};

export const removeCaseFromTaskByTaskID = async (data: number) => {
  await removeCaseFromTaskByTaskIDRequest(data);
};

export const removeSolutionFromTaskByTaskID = async (data: number) => {
  await removeSolutionFromTaskByTaskIDRequest(data);
};
