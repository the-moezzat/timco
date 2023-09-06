import { getAllPosts } from '@/services/blogApi';
import { useQuery } from 'react-query';
import BlogItem from '../dashboard/blogItem';

function Blog() {
  const { isLoading, data } = useQuery(['blog'], {
    queryFn: getAllPosts,
    onSuccess: (data) => console.log(data),
    staleTime: Infinity,
  });
  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div className=" flex flex-col gap-8">
        {data &&
          data.map((post) => (
            <BlogItem
              key={post.id}
              thumbnail={post.thumbnail as string}
              content={post.content as string}
              title={post.title as string}
              createdAt={post.created_at as string}
              id={String(post.id)}
            />
          ))}
      </div>
    </div>
  );
}

export default Blog;
