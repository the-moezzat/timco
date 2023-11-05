import { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Loading from './components/Loading';
import { Toaster } from 'react-hot-toast';
import TimRoutes from './features/tim/routes';
import UserRoutes from './features/user/routes';
// import Test from './test';

const Login = lazy(() => import('./features/dashboard/login'));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<Loading type="screen" size="large" />}>
        <BrowserRouter>
          <AnimatePresence initial={true} mode="wait">
            <Routes>
              <Route path="login" element={<Login />} />
            </Routes>

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
