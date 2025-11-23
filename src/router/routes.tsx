import { Navigate, type RouteObject } from 'react-router-dom';

// Pages
import LoginPage from '../modules/auth/pages/LoginPage';
import RegisterPage from '../modules/auth/pages/RegisterPage';
import MainLayout from '../modules/layouts/pages/MainLayout';
import TasksPage from '../modules/tasks/pages/TasksPage';
import DashboardPage from '../modules/dashboard/pages/DashboardPage';

// Guards
import ProtectedRoute from './ProtectedRoute';

const router: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout /> 
      </ProtectedRoute>
    ),
    children: [
      {
        path:"/dashboard",
        element:<DashboardPage/>
      },
      {
        path: "tasks",
        element: <TasksPage />, 
      },
      
    ],
  },
];

export default router;