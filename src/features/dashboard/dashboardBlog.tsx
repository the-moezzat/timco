import AddBlog from "./addBlog";

function DashboardBlog() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Gallery</h1>
        <AddBlog/>
      </div>
    </div>
  );
}

export default DashboardBlog;
