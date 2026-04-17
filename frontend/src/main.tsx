import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import '@/styles/global.css';
import router from '@/routers/main.router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from 'antd';

const queryClient = new QueryClient();

const MyApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <App>
          <RouterProvider router={router} />
        </App>
      </QueryClientProvider>
    </>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyApp />
  </StrictMode>
);
