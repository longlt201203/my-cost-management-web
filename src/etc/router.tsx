import { createBrowserRouter } from "react-router-dom";
import MyApp from "../App";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../pages/Dashboard";
import DashboardHomePage from "../pages/Dashboard/Home";
import DashboardBoardsPage from "../pages/Dashboard/Boards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyApp />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <DashboardHomePage />,
          },
          {
            path: "boards",
            element: <DashboardBoardsPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
