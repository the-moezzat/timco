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
import MainGallery from './features/gallery/mainGallery';
import AppLayout from './pages/appLayout';
import DashboardBlog from './features/dashboard/dashboardBlog';
import BlogPost from './features/blog/blogPost';
import Blog from './features/blog/blog';
import Contact from './features/contact/contact';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

const imageDetails = {
  width: 324,
  height: 324,
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <AnimatePresence initial={true} mode="wait">
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home imageDetails={imageDetails} />} />
              <Route path="current" element={<h1>Current</h1>} />
              <Route path="blog" element={<Blog type="user" />} />
              <Route path="blog/:blogId" element={<BlogPost />} />
              <Route path="gallery" element={<MainGallery />} />
              <Route path="contact" element={<Contact />} />
            </Route>
            <Route
              path="/model/:id"
              element={<Model imageDetails={imageDetails} />}
            />
            <Route path="login" element={<Login />} />
            <Route path="tim" element={<Dashboard />}>
              <Route index element={<Navigate to="gallery" />} />
              <Route path="gallery" element={<DashboardGallery />} />
              <Route path="blog" element={<DashboardBlog />} />
              <Route path="blog/:blogId" element={<BlogPost />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
