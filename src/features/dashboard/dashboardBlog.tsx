import { AddPost } from '@/services/blogApi';
import toast, { useToasterStore } from 'react-hot-toast';
import { useMutation, useQueryClient } from 'react-query';
import Blog from '../blog/blog';
import Add from './add';
import DashboardTitle from './dashboardTitle';

function DashboardBlog() {
  const queryClient = useQueryClient();
  const toasting = useToasterStore();
  console.log(toasting.toasts);

  let toastId: string;

  const { mutate } = useMutation({
    mutationFn: AddPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog'] });
      toast.success('Post added successfully', {
        id: toastId,
      });
    },
    onError: () => {
      toast.error('Field to add post', {
        id: toastId,
      });
    },
    onMutate() {
      toastId = toast.loading('Adding post...');
    },
  });

  return (
    <div>
      <DashboardTitle title="Blog">
        <Add
          addFn={
            mutate as (values: {
              thumbnail?: FileList;
              draft: boolean;
              title: string;
              content: string;
              category: string;
              createdAt?: string;
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              albums?: any;
            }) => void
          }
        />
      </DashboardTitle>
      <div className=" max-w-4xl mx-auto">
        <Blog type="admin" />
      </div>
    </div>
  );
}

export default DashboardBlog;
