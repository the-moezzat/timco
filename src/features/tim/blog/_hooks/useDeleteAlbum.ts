import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { removeAlbum } from '../_utils/removeAlbum';

export default function useDeleteAlbum(
  originalAlbum: string[][],
  postTitle: string
) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  function deleteAlbum(album: string[]) {
    setLoading(true);

    // removeAlbum(album, originalAlbum);

    toast.promise(removeAlbum(postTitle, album, originalAlbum), {
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
