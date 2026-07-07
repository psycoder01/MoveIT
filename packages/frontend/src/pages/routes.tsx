import { createBrowserRouter, type RouteObject } from "react-router";

import Auth from "src/pages/Auth";
import Dashboard from "src/pages/Dashboard";
import ProtectedRoute from "src/pages/ProtectedRoute";
import Organization from "@/pages/organization/Organization";

const routesURL: Record<string, string> = {
  auth: "/auth",
  dashboard: "/dashboard",
  organizationById: "/organization/:organizationId",
};

const routes = [
  {
    path: routesURL.auth,
    element: <Auth />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: routesURL.dashboard,
        element: <Dashboard />,
      },
      {
        path: routesURL.organizationById,
        element: <Organization />,
      },
    ],
  },
  ,
] as RouteObject[];

const router = createBrowserRouter(routes);

export default router;
