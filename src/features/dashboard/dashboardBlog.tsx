import Blog from '../blog/blog';
import AddBlog from './addBlog';

function DashboardBlog() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Blog</h1>
        <AddBlog />
      </div>
      <Blog />
    </div>
  );
}

export default DashboardBlog;
