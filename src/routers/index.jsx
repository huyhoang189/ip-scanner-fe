import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts";
import NotFound from "../pages/errors/notFound";
import Home from "../pages/home";
import Department from "../pages/departments";
import IpRange from "../pages/ipRanges";
import Session from "../pages/sessions";
import ScanBySession from "../pages/scans";
import Curator from "../pages/curators";
import ReportIpRange from "../pages/reports/ipRanges";
import ReportSession from "../pages/reports/sessions";
import Contact from "../pages/contacts";
import Login from "../pages/auth/login";
import Schedule from "../pages/schedules";
import Setting from "../pages/settings";
import User from "../pages/users";
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
        path: "contacts",
        element: <Contact />,
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
        path: "reports",
        children: [
          {
            path: "reports-ipranges",
            element: <ReportIpRange />,
          },
          {
            path: "reports-ipranges/:type",
            element: <ReportIpRange />,
          },
          {
            path: "reports-sessions",
            element: <ReportSession />,
          },
        ],
      },

      // {
      //   path: "reports-ipranges",
      //   element: <ReportIpRange />,
      // },
      // {
      //   path: "reports-ipranges/:type",
      //   element: <ReportIpRange />,
      // },

      {
        path: "systems",
        children: [
          {
            path: "systems-departments",
            element: <Department />,
          },
          {
            path: "systems-departments/:id",
            element: <Curator />,
          },
          {
            path: "systems-schedules",
            element: <Schedule />,
          },
          {
            path: "systems-settings",
            element: <Setting />,
          },
          {
            path: "systems-users",
            element: <User />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
