import Model from './home';
import Test from '@/test';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import MainCurrent from './current';
import UserSide from '.';

const Gallery = lazy(() => import('./gallery'));
const BlogPost = lazy(() => import('@/components/blog/blogPost'));
const Blog = lazy(() => import('./blog'));
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
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="test" element={<Test />} />
      </Route>
    </Routes>
  );
}
