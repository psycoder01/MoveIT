import { createBrowserRouter, type RouteObject } from "react-router";

import Auth from "src/pages/Auth";
import Dashboard from "src/pages/Dashboard";

const routes = [
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/",
    Component: Dashboard,
  },
  ,
] as RouteObject[];

const router = createBrowserRouter(routes);

export default router;
