import Blog from '../blog/blog';
import AddBlog from './addBlog';

function DashboardBlog() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-bold">Blog</h1>
        <AddBlog />
      </div>
      <div className=" max-w-4xl mx-auto">
        <Blog />
      </div>
    </div>
  );
}

export default DashboardBlog;
