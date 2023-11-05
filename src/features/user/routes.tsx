import Model from '@/pages/model';
import Test from '@/test';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
// import AppLayout from '@/pages/appLayout';
// import Blog from '../blog/blog';
// import BlogPost from '../blog/blogPost';
import MainCurrent from '../current/mainCurrent';
// import Contact from '../contact/contact';
// import MainGallery from '../gallery/mainGallery';

const MainGallery = lazy(() => import('../gallery/mainGallery'));
const AppLayout = lazy(() => import('@/pages/appLayout'));
const BlogPost = lazy(() => import('../blog/blogPost'));
const Blog = lazy(() => import('../blog/blog'));
const Contact = lazy(() => import('../contact/contact'));

const imageDetails = {
  width: 324,
  height: 324,
};

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Model imageDetails={imageDetails} />} />
        <Route path="current" element={<MainCurrent />} />
        <Route
          path="blog"
          element={
            <div>
              <div className=" max-w-4xl mx-auto">
                <Blog type="user" />
              </div>
            </div>
          }
        />
        <Route path="blog/:blogId" element={<BlogPost />} />
        <Route path="gallery" element={<MainGallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
}
