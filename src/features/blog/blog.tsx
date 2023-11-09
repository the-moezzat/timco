import BlogItem from './blogItem';
import Loading from '@/components/Loading';
import Search from '../tim/blog/_components/search';
import usePosts from './usePosts';

function Blog({ type }: { type: 'admin' | 'user' }) {
  const { data, isLoading } = usePosts();

  // const queryClient = useQueryClient();
  // const { mutate: edit, isLoading: editing } = useMutation({
  //   mutationFn: updatePost,
  //   onSuccess: (data) => {
  //     queryClient.invalidateQueries({ queryKey: ['blog'] });
  //     queryClient.invalidateQueries({
  //       queryKey: ['post', String(data[0].id)],
  //     });

  //     toast.success('Post updated successfully');
  //   },
  //   onError: () => {
  //     toast.error('Something went wrong');
  //   },
  // });

  return (
    <div className="px-4 mt-6">
      <Search />
      <div className="max-w-5xl py-8 mx-auto font-inter px-4 flex flex-col gap-6 max-md:gap-3 max-md:px-0">
        {isLoading && <Loading size="large" type="full" />}
        <div className=" flex flex-col gap-8">
          {data &&
            data.map(
              (post) =>
                (post.draft && type === 'user') || (
                  <BlogItem key={post.id} post={post} />
                )
            )}
        </div>
      </div>
    </div>
  );
}

export default Blog;
