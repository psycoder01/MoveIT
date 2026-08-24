import { createBrowserRouter, type RouteObject } from "react-router";

import Auth from "src/pages/Auth";
import Dashboard from "src/pages/Dashboard";
import ProtectedRoute from "src/pages/ProtectedRoute";
import Organization from "@/pages/organization/Organization";
import Invitation from "@/pages/invitations/Invitation";

const routesURL: Record<string, string> = {
  auth: "/auth",
  dashboard: "/dashboard",
  organizationById: "/organization/:organizationId",
  invitationById: "/invitations/:invitationId"
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
      {
        path: routesURL.invitationById,
        element: <Invitation />,
      }
    ],
  },
  ,
] as RouteObject[];

const router = createBrowserRouter(routes);

export default router;
