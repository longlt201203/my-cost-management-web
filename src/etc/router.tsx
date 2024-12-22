import { createBrowserRouter } from "react-router-dom";
import MyApp from "../App";
import DashboardLayout from "../pages/Dashboard";
import DashboardHomePage from "../pages/Dashboard/Home";
import DashboardBoardsPage from "../pages/Dashboard/Boards";
import NotFoundPage from "../pages/ErrorPage/NotFoundPage";
import AuthProvider from "../providers/AuthProvider";
import BoardDetailPage from "../pages/Dashboard/Boards/BoardDetailPage";
import DashboardAnalyticsPage from "../pages/Dashboard/Analytics";
import DashboardCategoriesPage from "../pages/Dashboard/Categories";
import AuthPage from "../pages/AuthPage";
import DashboardAccountPage from "../pages/Dashboard/Account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyApp />,
    children: [
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "",
        element: <AuthProvider />,
        children: [
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
              {
                path: "boards/:boardId",
                element: <BoardDetailPage />,
              },
              {
                path: "analytics/:boardId",
                element: <DashboardAnalyticsPage />,
              },
              {
                path: "analytics",
                element: <DashboardAnalyticsPage />,
              },
              {
                path: "categories",
                element: <DashboardCategoriesPage />,
              },
              {
                path: "account",
                element: <DashboardAccountPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
