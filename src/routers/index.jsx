import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts";
import NotFound from "../pages/errors/notFound";
import Home from "../pages/home";
import Department from "../pages/departments";
import IpRange from "../pages/ipRanges";
import Session from "../pages/sessions";
import ScanBySession from "../pages/scans";
import Curator from "../pages/curators";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "sessions",
        element: <Session />,
      },
      {
        path: "sessions/:session_id",
        element: <ScanBySession />,
      },
      {
        path: "ipranges",
        element: <IpRange />,
      },

      {
        path: "systems",
        children: [
          {
            path: "departments",
            element: <Department />,
          },
          {
            path: "departments/:id",
            element: <Curator />,
          },
        ],
      },
    ],
  },
]);
