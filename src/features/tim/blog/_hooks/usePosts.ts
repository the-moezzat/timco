import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { getAllPosts } from '@/services/blogApi';
import { useCallback } from 'react';

export default function usePosts() {
  const [searchParams] = useSearchParams();
  const [filteredPosts, setFilteredPosts] = useState<typeof data>([]);

  const { isLoading, data, isError } = useQuery(['blog'], {
    queryFn: () =>
      getAllPosts({
        title: searchParams.get('title') ?? '',
        category: searchParams.get('category') ?? '',
      }),
    staleTime: Infinity,
  });

  const filterPosts = useCallback(
    function filterPosts() {
      const filtered =
        data &&
        data.filter((post) => {
          const nameMatch = post.title
            .toLowerCase()
            .includes((searchParams.get('search') ?? '').toLowerCase());
          const categoryMatch = post?.category.includes(
            searchParams.get('filter') ?? ''
          );
          return nameMatch && categoryMatch;
        });
      setFilteredPosts(filtered);
    },
    [data, searchParams]
  );

  useEffect(() => {
    filterPosts();
  }, [filterPosts, searchParams]);

  return { data: filteredPosts, isLoading, isError };
}
