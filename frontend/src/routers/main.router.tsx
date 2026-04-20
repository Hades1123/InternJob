import { MainLayout } from '@/components/layouts/main.layout';
import { ScrollTop } from '@/components/layouts/scroll-top';
import { DashboardPage } from '@/pages/dashboard';
import { StaticPage } from '@/pages/static';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <ScrollTop />
        <MainLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: '/static',
        element: <StaticPage />,
      },
    ],
  },
]);

export default router;
