import { IUser } from "../auth/types";
import { ICase } from "../case/types";
import { ICluster } from "../cluster/types";

export interface ITask {
  id: number;
  title: string;
  description: string;
  solution: string;
  status: TaskStatusEnum;
  created_at: string;
  formed_at?: string;
  completed_at?: string;
  case?: ICase;
  cluster: ICluster;
  user: IUser;
  fire: boolean;
}

export enum TaskStatusEnum {
  Draft,
  InProgress,
  Completed,
}

export interface ICreateTask {
  title: string;
  description: string;
}

export interface IAddSolutionToTask {
  id: ITask["id"];
  solution: string;
}

export type GetTasksResponseType = ITask[] | null;
