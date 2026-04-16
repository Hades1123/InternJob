import { MainLayout } from '@/components/layouts/main.layout';
import { DashboardPage } from '@/pages/dashboard';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
]);

export default router;
