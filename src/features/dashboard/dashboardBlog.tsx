import Blog from '../blog/blog';
import DashboardTitle from './dashboardTitle';
import AddSheet from '../blog-post/add-sheet';

function DashboardBlog() {
  return (
    <div>
      <DashboardTitle title="Blog">
        <div className="space-x-4">
          <AddSheet />
        </div>
      </DashboardTitle>
      <div className=" max-w-4xl mx-auto">
        <Blog type="admin" />
      </div>
    </div>
  );
}

export default DashboardBlog;
