import MainLayout from "../../modules/MainLayout/MainLayout";
import AccountSettings from "../../pages/AccountSettings/AccountSettings";
import AnalogPage from "../../pages/AnalogPage/AnalogPage";
import BlacklistSellers from "../../pages/BlacklistSellers/BlacklistSellers";
import CatalogInfo from "../../pages/CatalogInfo/CatalogInfo";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import ConfirmMail from "../../pages/ConfirmMail/ConfirmMail";
import FavoriteSellers from "../../pages/FavoriteSellers/FavoriteSellers";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { MainPage } from "../../pages/MainPage/MainPage";
import { NotFoundPage } from "../../pages/NotFoundPage/NotFoundPage";
import { RecoverPage } from "../../pages/RecoverPage/RecoverPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import SearchSellers from "../../pages/SearchSellers/SearchSellers";
import SellerInfo from "../../pages/SellerInfo/SellerInfo";
import { IAppRoute } from "./types";

export enum RoutesEnum {
  Home = "/",
  Register = "/register",
  Auth = "/auth",
  Recover = "/recovery/:token",
  Catalog = "/catalog",
  CatalogInfo = "/catalog/:categoryName/:subcategoryName",
  Analog = "/analog",
  AccountSetting = "/settings",
  Sellers = "/sellers",
  SellerInfo = "/seller/:companyName",
  FavoriteSellers = "/sellers/favorite",
  BlackListSellers = "/sellers/blacklist",
  Confirm = "/token/:token",
}

export const routes: IAppRoute[] = [
  {
    path: RoutesEnum.Home,
    element: (
      <MainLayout>
        <MainPage />
      </MainLayout>
    ),
  },
  {
    path: RoutesEnum.Confirm,
    element: (
      <MainLayout>
        <ConfirmMail />
      </MainLayout>
    ),
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
    path: RoutesEnum.CatalogInfo,
    element: (
      <MainLayout>
        <CatalogInfo />
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
    path: RoutesEnum.FavoriteSellers,
    element: (
      <MainLayout>
        <FavoriteSellers />
      </MainLayout>
    ),
  },
  {
    path: RoutesEnum.BlackListSellers,
    element: (
      <MainLayout>
        <BlacklistSellers />
      </MainLayout>
    ),
  },
  {
    path: RoutesEnum.SellerInfo,
    element: (
      <MainLayout>
        <SellerInfo />
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
