import { AddPost } from '@/services/blogApi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

export default function useAddPost() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  function publishPost({
    title,
    draft,
    content,
    category,
    thumbnail,
    albums,
    uploadedAlbums,
    createdAt,
  }: {
    title: string;
    content: string;
    thumbnail: FileList;
    category: string;
    draft: boolean;
    albums: FileList[];
    createdAt: string;
    uploadedAlbums?: string[][] | undefined;
  }) {
    setLoading(true);

    toast.promise(
      AddPost({
        title,
        draft,
        content,
        category,
        thumbnail,
        albums,
        uploadedAlbums,
        createdAt,
      }),
      {
        loading: 'Adding new post...',
        success() {
          setLoading(false);
          queryClient.invalidateQueries(['blog']);
          return 'Post added successfully';
        },
        error() {
          setLoading(false);
          return 'Failed to publish post';
        },
      }
    );
  }

  return { publishPost, loading };
}
