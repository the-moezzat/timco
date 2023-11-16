import { Markdown } from '@/components/markdown';
import { getPostByTitle } from '@/services/blogApi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import remarkGfm from 'remark-gfm';
import Album from './album';

function BlogPost() {
  const { blogId } = useParams();

  const { data, isLoading } = useQuery(['post', blogId], {
    queryFn: () => getPostByTitle(blogId?.replaceAll('_', ' ') as string),
    onSuccess: (data) => console.log(data),
    staleTime: Infinity,
  });

  const post = data && data[0];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const albums: any = post?.albums;

  console.log(post);

  return (
    <div>
      {isLoading && 'Loading...'}
      {post && (
        <div className="max-w-4xl mx-auto py-8 flex flex-col items-center font-inter ">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 font-inter text-[#212529] text-center">
            {post.title}
          </h1>
          <p className="text-sm font-medium leading-none text-gray-500 mb-12 ">
            {new Date(post.created_at as string).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>

          {post.thumbnail && (
            <img src={post.thumbnail as string} alt="post" className="mb-12" />
          )}

          {post.content?.split('//=//=//=//').map((content, i) => (
            <div className=" self-start text center">
              <Markdown
                children={content}
                remarkPlugins={[remarkGfm]}
                className=" text-start"
              />

              <Album album={albums[i]} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogPost;
