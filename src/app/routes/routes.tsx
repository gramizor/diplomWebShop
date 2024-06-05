// import MainLayout from "../../modules/MainLayout/MainLayout";
import MainLayout from "../../modules/MainLayout/MainLayout";
import AccountSettings from "../../pages/AccountSettings/AccountSettings";
import AnalogPage from "../../pages/AnalogPage/AnalogPage";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { MainPage } from "../../pages/MainPage/MainPage";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";
import { RecoverPage } from "../../pages/RecoverPage/RecoverPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import SearchSellers from "../../pages/SearchSellers/SearchSellers";
import { IAppRoute } from "./types";

/**
 * Маршруты приложения
 */
export enum RoutesEnum {
  Home = "/",
  Register = "/register",
  Auth = "/auth",
  Recover = "/recover",
  Catalog = "/catalog",
  Analog = "/analog",
  AccountSetting = "/settings",
  Sellers = "/sellers",
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
    element: <MainPage />,
  },
  {
    path: RoutesEnum.Catalog,
    element: (
      <MainLayout>
        <CatalogPage />
      </MainLayout>
    ),
  },
  {
    path: RoutesEnum.Analog,
    element: (
      <MainLayout>
        <AnalogPage />
      </MainLayout>
    ),
  },
  {
    path: RoutesEnum.AccountSetting,
    element: (
      <MainLayout>
        <AccountSettings />
      </MainLayout>
    ),
  },
  {
    path: RoutesEnum.Sellers,
    element: (
      <MainLayout>
        <SearchSellers />
      </MainLayout>
    ),
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
