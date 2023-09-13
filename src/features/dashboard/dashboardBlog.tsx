import Blog from '../blog/blog';
import Add from './add';
import DashboardTitle from './dashboardTitle';

function DashboardBlog() {
  return (
    <div>
      <DashboardTitle title="Blog">
        <Add />
      </DashboardTitle>
      <div className=" max-w-4xl mx-auto">
        <Blog type="admin" />
      </div>
    </div>
  );
}

export default DashboardBlog;
