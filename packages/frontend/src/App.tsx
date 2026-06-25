import { RouterProvider } from "react-router";

import router from "src/pages/routes";

export function App() {
  return <RouterProvider router={router} />;
}
