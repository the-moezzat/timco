import { getImages } from '@/services/galleryApi';
import { useQuery } from 'react-query';

export default function usePics() {
  const { data, isLoading, error } = useQuery(['gallery'], {
    queryFn: getImages,
  });

  return { data, isLoading, error };
}
