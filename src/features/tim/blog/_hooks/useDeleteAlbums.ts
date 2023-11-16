import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

export default function useDeleteAlbum(album: string[]) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  function deleteAlbum(id: string) {
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

  return { deleteAlbum, deleting: loading };
}
