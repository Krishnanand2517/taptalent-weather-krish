import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./store.ts";
import "./index.css";
import App from "./App.tsx";
import DashboardView from "./views/DashboardView.tsx";
import DetailedView from "./views/DetailedView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashboardView />,
      },
      {
        path: "/:cityId",
        element: <DetailedView />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
