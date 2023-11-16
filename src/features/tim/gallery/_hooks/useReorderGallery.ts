import { reorderGallery } from '@/services/galleryApi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

export function useReorderGallery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  function reorderImages(
    image: {
      id: number;
      order: number;
    }[],
    onSuccess?: () => void
  ) {
    setLoading(true);
    toast.promise(reorderGallery(image), {
      loading: 'Uploading image...',
      success: () => {
        setLoading(false);
        queryClient.invalidateQueries(['gallery']);
        onSuccess?.();

        return 'Image uploaded!';
      },
      error: () => {
        setLoading(false);
        setError(true);
        return 'Failed to upload image';
      },
    });
  }

  return { loading, reorderImages, error };
}
