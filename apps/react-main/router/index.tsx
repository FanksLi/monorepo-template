import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Chat = lazy(() => import('../src/pages/Chat'));

const routes = [
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Chat />
      </Suspense>
    ),
  },
];

export default createBrowserRouter(routes);
