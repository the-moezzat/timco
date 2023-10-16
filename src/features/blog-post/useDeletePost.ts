import { deletePost as removePost } from '@/services/blogApi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

export default function useDeletePost() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  function deletePost(id: string) {
    setLoading(true);

    toast.promise(removePost(id), {
      loading: 'Deleting post...',
      success() {
        setLoading(false);
        queryClient.invalidateQueries(['blog']);
        return 'Post deleted successfully';
      },
      error() {
        setLoading(false);
        return 'Failed to delete post';
      },
    });
  }

  return { deletePost, deleting: loading };
}
