import {
  LoginPage,
  MainPage,
  NotFoundPage,
  RecoverPage,
  RegisterPage,
} from "../../pages";
import { IAppRoute } from "./types";

/**
 * Маршруты приложения
 */
export enum RoutesEnum {
  Home = "/",
  Register = "/register",
  Auth = "/auth",
  Recover = "/recover",
}

/**
 * Массив объектов маршрутов приложения.
 * Каждый объект представляет собой маршрут приложения с различными свойствами.
 * @property {string} label - Название маршрута для отображения в боковой панели или навигационном меню.
 * @property {string} path - Путь к маршруту.
 * @property {boolean} [index] - Опция, указывающая, что это индексный маршрут (например, для домашней страницы).
 * @property {boolean} [isPrivate] - Опция, указывающая, что маршрут доступен только для авторизованных пользователей.
 * @property {JSX.Element} [icon] - Иконка, связанная с маршрутом.
 * @property {JSX.Element} element - React-компонент, который будет отображаться при переходе по этому маршруту.
 * @property {IAppRoute[]} [children] - Дочерние маршруты (если есть).
 */
export const routes: IAppRoute[] = [
  {
    path: RoutesEnum.Home,
    index: true,
    isPrivate: false,
    element: <MainPage />,
  },
  {
    path: RoutesEnum.Auth,
    element: <LoginPage />,
  },
  {
    path: RoutesEnum.Register,
    element: <RegisterPage />,
  },
  {
    path: RoutesEnum.Recover,
    element: <RecoverPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
