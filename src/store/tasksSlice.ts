import { create } from "zustand";
import { ITask } from "../core/task/types";

export type TasksState = {
  activeTask: ITask["id"];
  draftTasks: ITask[];
  activeTasks: ITask[];
};

export type TasksActions = {
  changeActiveTask: (taskId: number) => void;
  closeTask: () => void;
  updateDraftTasks: (tasks: ITask[]) => void;
  updateActiveTasks: (tasks: ITask[]) => void;
};

const initialState: TasksState = {
  activeTask: -1,
  draftTasks: [],
  activeTasks: [],
};

export const useTasks = create<TasksActions & TasksState>((set) => ({
  ...initialState,
  changeActiveTask: (task) => set({ activeTask: task }),
  closeTask: () => set({ activeTask: -1 }),
  updateDraftTasks: (tasks) => set({ draftTasks: tasks }),
  updateActiveTasks: (tasks) => set({ activeTasks: tasks }),
}));
