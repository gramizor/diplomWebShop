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
