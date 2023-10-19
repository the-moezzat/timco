import { uploadImage } from '@/services/galleryApi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

export function useAddImage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();

  function addImage(image: File, onSuccess: () => void) {
    setLoading(true);
    toast.promise(uploadImage(image), {
      loading: 'Uploading image...',
      success: () => {
        setLoading(false);
        queryClient.invalidateQueries(['gallery']);
        onSuccess();

        return 'Image uploaded!';
      },
      error: () => {
        setLoading(false);
        setError(true);
        return 'Failed to upload image';
      },
    });
  }

  return { loading, addImage, error };
}
