import Loading from '@/components/Loading';
import Header from '../_components/header';
import AddPost from './_components/add-post';
import Search from '@/components/blog/search';
import usePosts from '@/hooks/blog/usePosts';
import Post from './_components/post';

function Blog() {
  const { data, isLoading } = usePosts();

  return (
    <div>
      <Header title="Blog">
        <div className="space-x-4">
          <AddPost />
        </div>
      </Header>
      <div className=" max-w-4xl mx-auto">
        {/* <Blog /> */}
        <div className="px-4 mt-6">
          <Search />
          <div className="max-w-5xl py-8 mx-auto font-inter px-4 flex flex-col gap-6 max-md:gap-3 max-md:px-0">
            {isLoading && <Loading size="large" type="full" />}
            <div className=" flex flex-col gap-3">
              {data && data.map((post) => <Post key={post.id} post={post} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
