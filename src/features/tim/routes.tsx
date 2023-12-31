import { Navigate, Route, Routes } from 'react-router-dom';
import BlogPost from '@/components/blog/blogPost';
import { lazy } from 'react';
import Tim from '.';

const Current = lazy(() => import('./current'));
const Blog = lazy(() => import('./blog'));
const Gallery = lazy(() => import('./gallery'));

function TimRoutes() {
  return (
    <Routes>
      <Route path="tim" element={<Tim />}>
        <Route index element={<Navigate to="current" />} />
        <Route path="current" element={<Current />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:blogId" element={<BlogPost />} />
      </Route>
    </Routes>
  );
}

export default TimRoutes;
