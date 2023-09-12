import { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllPosts } from '@/services/blogApi';

export default function usePosts() {
  const [searchParams] = useSearchParams();

  // const { isLoading, data, isError, refetch } = useQuery(['blog'], {
  //   queryFn: () =>
  //     getAllPosts({
  //       title: title,
  //       category: category,
  //     }),
  //   onSuccess: (data) => console.log(data),
  //   staleTime: Infinity,
  // });

  const { data, isLoading, mutate, isError } = useMutation(getAllPosts, {
    onSuccess: (data) => console.log(data),
  });
  useEffect(
    function () {
      mutate({
        title: searchParams.get('search') ?? '',
        category: (searchParams.get('filter') as string) ?? '',
      });
    },
    [mutate, searchParams]
  );

  // useEffect(
  //   function () {
  //     refetch({
  //       queryKey: ['blog'],
  //     });
  //   },
  //   [searchParams, refetch]
  // );

  return { data, isLoading, isError };
}
