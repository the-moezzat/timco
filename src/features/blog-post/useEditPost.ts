import { updatePost } from '@/services/blogApi';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

export default function useEditPost() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  function editPost(newPost: {
    id: string;
    draft: boolean;
    title: string;
    content: string;
    category: string;
    thumbnail: string | FileList;
    oldAlbumsOrder: string[][];
    newAlbums: FileList[];
    uploadedAlbums: string[][];
    createdAt: string;
  }) {
    setLoading(true);

    toast.promise(updatePost(newPost), {
      loading: 'Editing new post...',
      success() {
        setLoading(false);
        queryClient.invalidateQueries(['blog']);
        return 'Post edited';
      },
      error() {
        setLoading(false);
        return 'Failed to edit post';
      },
    });
  }

  return { editPost, loading };
}
