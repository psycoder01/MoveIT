import { createBrowserRouter, type RouteObject } from "react-router";

import Auth from "src/pages/Auth";
import Dashboard from "src/pages/Dashboard";
import ProtectedRoute from "src/pages/ProtectedRoute";

const routes = [
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
  ,
] as RouteObject[];

const router = createBrowserRouter(routes);

export default router;
