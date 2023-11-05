import { Navigate, Route, Routes } from 'react-router-dom';
import BlogPost from '../blog/blogPost';
import { lazy } from 'react';

const DashboardCurrent = lazy(() => import('../dashboard/dashboardCurrent'));
const DashboardBlog = lazy(() => import('../dashboard/dashboardBlog'));
const DashboardGallery = lazy(() => import('../dashboard/dashboardGallery'));
const Dashboard = lazy(() => import('@/pages/dashboard'));

function TimRoutes() {
  return (
    <Routes>
      <Route path="tim" element={<Dashboard />}>
        <Route index element={<Navigate to="gallery" />} />
        <Route path="current" element={<DashboardCurrent />} />
        <Route path="gallery" element={<DashboardGallery />} />
        <Route path="blog" element={<DashboardBlog />} />
        <Route path="blog/:blogId" element={<BlogPost />} />
      </Route>
    </Routes>
  );
}

export default TimRoutes;
