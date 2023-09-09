import { Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Loading from './components/Loading';
import { Toaster } from 'react-hot-toast';
import MainCurrent from './features/current/mainCurrent';

const Home = lazy(() => import('./pages/home'));
const Model = lazy(() => import('./pages/model'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./features/dashboard/login'));
const DashboardGallery = lazy(
  () => import('./features/dashboard/dashboardGallery')
);
const MainGallery = lazy(() => import('./features/gallery/mainGallery'));
const AppLayout = lazy(() => import('./pages/appLayout'));
const DashboardBlog = lazy(() => import('./features/dashboard/dashboardBlog'));
const BlogPost = lazy(() => import('./features/blog/blogPost'));
const Blog = lazy(() => import('./features/blog/blog'));
const Contact = lazy(() => import('./features/contact/contact'));
const DashboardCurrent = lazy(
  () => import('./features/dashboard/dashboardCurrent')
);

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
      <Suspense fallback={<Loading type="screen" size="large" />}>
        <BrowserRouter>
          <AnimatePresence initial={true} mode="wait">
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Home imageDetails={imageDetails} />} />
                <Route path="current" element={<MainCurrent />} />
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
                <Route path="current" element={<DashboardCurrent />} />
                <Route path="gallery" element={<DashboardGallery />} />
                <Route path="blog" element={<DashboardBlog />} />
                <Route path="blog/:blogId" element={<BlogPost />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
