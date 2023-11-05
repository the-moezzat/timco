import Model from '@/pages/model';
import Test from '@/test';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import MainCurrent from './current';
import UserSide from '.';

const MainGallery = lazy(() => import('../gallery/mainGallery'));
const BlogPost = lazy(() => import('../blog/blogPost'));
const Blog = lazy(() => import('../blog/blog'));
const Contact = lazy(() => import('./contact'));

const imageDetails = {
  width: 324,
  height: 324,
};

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserSide />}>
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
