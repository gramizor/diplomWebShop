import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/authSlice";
import { RoutesEnum } from "../../app/routes/routes";
import { FC, ReactNode } from "react";
import { USER_EMAIL_KEY, USER_TOKEN_KEY } from "../../core/constants";

export const PrivateRoute: FC<{ children?: ReactNode }> = ({ children }) => {
  const { isAuth, saveUser } = useAuth();

  const email = localStorage.getItem(USER_EMAIL_KEY);
  const token = localStorage.getItem(USER_TOKEN_KEY);

  if (!isAuth) {
    if (email && token) {
      saveUser(email);
    } else {
      return <Navigate to={RoutesEnum.Login} />;
    }
  }

  return children || <Outlet />;
};
