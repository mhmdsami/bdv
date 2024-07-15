import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, GDPGrowthRateVisualization, ManufacturingPlant } from "./routes";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/assignment-3",
    element: <ManufacturingPlant />,
  },
  {
    path: "/assignment-4",
    element: <GDPGrowthRateVisualization />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
