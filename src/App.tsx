import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Model from './pages/model';
import './App.scss';
import Dashboard from './pages/dashboard';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import Login from './features/dashboard/login';
import DashboardGallery from './features/dashboard/dashboardGallery';

const queryClient = new QueryClient();

const imageDetails = {
  width: 324,
  height: 324,
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AnimatePresence initial={true} mode="wait">
          <Routes>
            <Route path="/" element={<Home imageDetails={imageDetails} />} />
            <Route
              path="/model/:id"
              element={<Model imageDetails={imageDetails} />}
            />
          </Routes>
        </AnimatePresence>
        <Routes>
          <Route path="tim" element={<Dashboard />}>
            <Route index element={<Navigate to="gallery" />} />
            <Route path="gallery" element={<DashboardGallery />} />
            <Route path="blog" element={<p>Blog</p>} />
          </Route>
        </Routes>
        <Routes>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
