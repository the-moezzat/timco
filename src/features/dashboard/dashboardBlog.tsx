import Blog from '../blog/blog';
import Add from './add';
// import AddBlog from './addBlog';

function DashboardBlog() {
  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-5xl font-bold">Blog</h1>
        {/* <AddBlog /> */}
        <Add />
      </div>
      <div className=" max-w-4xl mx-auto">
        <Blog type="admin" />
      </div>
    </div>
  );
}

export default DashboardBlog;
