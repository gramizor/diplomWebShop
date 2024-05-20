import { RouteObject } from "react-router-dom";
import { PrivateRoute } from "../../components";
import { routes } from "./routes";
import { IAppRoute, ISimpleRouteObject } from "./types";

/**
 * Роуты для react-router-dom
 */
export const realRoutes: RouteObject[] = convertRoutes(routes);

/**
 * Роуты для sidebar, navbar и тд
 */
export const smallRoutes = selectRoutes(routes);

/**
 * @param routes IAppRoute[] - Массив объектов маршрутов.
 * @returns RouteObject[] - Массив объектов маршрутов для router dom
 */
function convertRoutes(routes: IAppRoute[]): RouteObject[] {
  return routes.map((route) => {
    const convertedRoute: RouteObject = {
      path: route.path,
      element: route.isPrivate ? (
        <PrivateRoute>{route.element}</PrivateRoute>
      ) : (
        route.element
      ),
    };
    if (route.children) {
      convertedRoute.children = convertRoutes(route.children);
    }
    return convertedRoute;
  });
}

/**
 * @param routes IAppRoute[] - Массив объектов маршрутов.
 * @returns ISimpleRouteObject[] - Массив простых объектов маршрутов для sidebar и тд.
 */
export function selectRoutes(routes: IAppRoute[]) {
  const selected: ISimpleRouteObject[] = [];
  routes.forEach((route) => {
    if (Object.prototype.hasOwnProperty.call(route, "children")) {
      route.children && selected.push(...selectRoutes(route.children));
    } else {
      route.label &&
        selected.push({
          path: route.path,
          label: route.label,
          icon: route.icon,
        });
    }
  });
  return selected;
}
