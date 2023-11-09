import { deleteThumbnail } from '@/services/blogApi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

export default function useDeleteThumbnail() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  function removeThumbnail(id: string, onSuccess: () => void) {
    setLoading(true);

    toast.promise(deleteThumbnail(id), {
      loading: 'Deleting thumbnail...',
      success() {
        onSuccess();
        setLoading(false);
        queryClient.invalidateQueries(['blog']);
        return 'Thumbnail deleted successfully';
      },
      error() {
        setLoading(false);
        return 'Failed to delete thumbnail';
      },
    });
  }

  return { deleteThumbnail: removeThumbnail, deletingThumbnail: loading };
}
