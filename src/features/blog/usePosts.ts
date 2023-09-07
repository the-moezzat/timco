import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllPosts } from '@/services/blogApi';

export default function usePosts() {
  const { data, isLoading, mutate, isError } = useMutation(getAllPosts, {
    onSuccess: (data) => console.log(data),
  });
  const [searchParams] = useSearchParams();

  useEffect(
    function () {
      mutate({
        title: searchParams.get('search') ?? '',
        category: (searchParams.get('filter') as string) ?? '',
      });
    },
    [mutate, searchParams]
  );

  return { data, isLoading, isError };
}
