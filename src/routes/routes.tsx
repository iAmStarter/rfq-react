// Updated router configuration
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layouts/Layout";
import { LoginPage } from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import { NotFoundPage } from "../pages/NotFoundPage";
import InitialWorkFlow from "../features/SCEWorkflows/InitialWorkFlow";
import MyTask from "../features/SCEWorkflows/MyTask";
import { UserManagementPage } from "../pages/UserManagementPage";
import { CommodityManagementPage } from "../pages/CommodityManagementPage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/sce-workflows/initial-workflow", element: <InitialWorkFlow /> },
          { path: "/sce-workflows/my-task", element: <MyTask /> },
          { path: "/sce-workflows/commodity-management", element: <CommodityManagementPage /> },
          { path: "/sce-workflows/user-management", element: <UserManagementPage /> },
          { path: "/settings/profile", element: <HomePage /> },
          { path: "/settings/account", element: <HomePage /> },
          // Catch-all route for undefined paths within protected area
          { path: "*", element: <NotFoundPage /> },
        ],
      },
    ],
  },
  // Catch-all route for undefined paths outside protected area
  { path: "*", element: <NotFoundPage /> },
]);
