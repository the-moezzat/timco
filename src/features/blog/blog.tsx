import { deletePost } from '@/services/blogApi';
import { useMutation, useQueryClient } from 'react-query';
import BlogItem from './blogItem';
import { Button } from '@/components/ui/button';
import Loading from '@/components/Loading';
import { useState } from 'react';
import Edit from './edit';
import Search from './search';
import usePosts from './usePosts';
import toast from 'react-hot-toast';

function Blog({ type }: { type: 'admin' | 'user' }) {
  const queryClient = useQueryClient();
  const [blogId, setBlogId] = useState(0);
  // const [searchParams] = useSearchParams();

  const { data, isLoading } = usePosts();

  // const { isLoading, data } = useQuery(['blog'], {
  //   queryFn: () =>
  //     getAllPosts({
  //       title: searchParams.get('search') as string,
  //       category: '',
  //     }),
  //   onSuccess: (data) => console.log(data),
  //   staleTime: Infinity,
  // });

  const { mutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['blog']);
      toast.success('Post deleted successfully');
    },
  });

  return (
    <div className="px-4 mt-6">
      <Search />
      <div className="max-w-5xl py-8 mx-auto font-inter px-4 flex flex-col gap-6 max-md:gap-3 max-md:px-0">
        {isLoading && <Loading size="large" type="full" />}
        <div className=" flex flex-col gap-8">
          {data && (
            <>
              {data.map(
                (post) =>
                  (post.draft && type === 'user') || (
                    <BlogItem
                      key={post.id}
                      thumbnail={post.thumbnail as string}
                      content={post.content as string}
                      title={post.title as string}
                      createdAt={post.created_at as string}
                      id={String(post.id)}
                      loading={blogId === post.id}
                    >
                      {type === 'admin' && (
                        <div className="flex gap-2 justify-end">
                          {/* <EditBlog defaultValues={post} /> */}
                          <Edit defaultValues={post} />
                          <Button
                            variant={'destructive'}
                            onClick={() => {
                              mutate(String(post.id));
                              setBlogId(post.id);
                            }}
                            size={'sm'}
                            disabled={blogId === post.id}
                          >
                            {blogId === post.id ? (
                              <>
                                <Loading size="small" type="self" />
                              </>
                            ) : (
                              'Delete'
                            )}
                          </Button>
                        </div>
                      )}
                    </BlogItem>
                  )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Blog;
