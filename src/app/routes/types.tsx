export interface IAppRoute {
  label?: string;
  path: string;
  index?: boolean;
  isPrivate?: boolean;
  icon?: JSX.Element;
  element: JSX.Element;
  children?: IAppRoute[];
}

export interface ISimpleRouteObject {
  label?: string;
  icon?: JSX.Element;
  path: string;
}

export interface IUserLoginData {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  access_token: string;
}

export interface IUserRegisterData {
  email: string;
  password: string;
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
  role: string;
}

export interface IUserRegisterResponse {
  user_id: number;
}

export interface IUser {
  id: number;
  email: string;
}
