import { createBrowserRouter } from "react-router-dom";
import MyApp from "../App";
import LoginPage from "../pages/LoginPage";
import DashboardLayout from "../pages/Dashboard";
import DashboardHomePage from "../pages/Dashboard/Home";
import DashboardBoardsPage from "../pages/Dashboard/Boards";
import NotFoundPage from "../pages/ErrorPage/NotFoundPage";
import AuthProvider from "../providers/AuthProvider";
import BoardDetailPage from "../pages/Dashboard/Boards/BoardDetailPage";

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
