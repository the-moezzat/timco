import { Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Loading from './components/Loading';
import { Toaster } from 'react-hot-toast';
import TimRoutes from './features/tim/routes';
import UserRoutes from './features/user/routes';
import LoginRoutes from './features/login/routes';
import { Analytics } from '@vercel/analytics/react';

// import Test from './test';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Analytics />

      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<Loading type="screen" size="large" />}>
        <BrowserRouter>
          <AnimatePresence initial={true} mode="wait">
            {/* Registration routes */}
            <LoginRoutes />

            {/* User route and pages */}
            <UserRoutes />

            {/* Dashboard routes and pages */}
            <TimRoutes />
          </AnimatePresence>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
