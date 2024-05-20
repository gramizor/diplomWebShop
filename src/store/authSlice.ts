import { create } from "zustand";

export type AuthState = {
  isAuth: boolean;
  userName: string;
};

export type AuthActions = {
  saveUser: (login: string) => void;
  logout: () => void;
};

const initialState: AuthState = {
  isAuth: false,
  userName: "",
};

export const useAuth = create<AuthActions & AuthState>((set) => ({
  ...initialState,
  logout: () => set(initialState),
  saveUser: (userName) => set({ userName: userName, isAuth: true }),
}));
